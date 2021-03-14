const fs = require('fs');
const util = require('util');
const path = require('path');
const readline = require('readline');
const makeDir = require('make-dir');
const neek = require('neek');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const copyFile = util.promisify(fs.copyFile);
const unlink = util.promisify(fs.unlink);
const access = util.promisify(fs.access);
const identityRender = (x, _data) => x;

const renderPageHtml = async ({sourcePath, render}) =>
  readFile(sourcePath).then(page => render(page.toString()));

const buildLayout = async ({sourcePath, outputPath, render}) => {
  const layout = await readFile(sourcePath);
  const output = render(layout.toString());
  await makeDir(path.dirname(outputPath));
  await writeFile(outputPath, output);

  return output;
};

const buildPage = async ({
  layoutPath = path.join('layouts', 'base.html'),
  pageSourcePath,
  outputFolderPath = 'public',
  relativeOutputPath,
  pageData = {},
  layoutData = {},
  renderPage = identityRender,
  renderLayout = identityRender,
}) => {
  const outputPath = path.join(outputFolderPath, relativeOutputPath);
  const publicFolderDepth = outputFolderPath.split(path.sep).length;

  const baseDistance =
    outputPath.split(path.sep).length - (publicFolderDepth + 1);

  const templateHelpers = {
    baseHref: '../'.repeat(baseDistance) || './',
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
    pageSourcePath,
  };

  const content = await renderPageHtml({
    sourcePath: pageSourcePath,
    render: template =>
      renderPage(template, {
        molino: templateHelpers,
        data: pageData,
      }),
  });

  const html = await buildLayout({
    sourcePath: layoutPath,
    outputPath,
    render: layout =>
      renderLayout(layout, {
        molino: templateHelpers,
        content,
        data: layoutData,
      }),
  });

  return {
    outputPath,
    html,
  };
};

const build = async ({siteBuilder, registryPath = 'sitemap.txt'}) => {
  const registryStream = fs.createWriteStream(registryPath, {
    flags: 'a',
  });

  const pagesInfo = siteBuilder();

  pagesInfo.forEach(pageInfo => {
    pageInfo.then(info => registryStream.write(`${info.outputPath}\n`));
  });

  await Promise.all(pagesInfo);
  registryStream.write(`\n`);

  registryStream.end(async () => {
    try {
      await copyFile(registryPath, registryPath + '.temp');
    } catch (_) {
      console.error('Unable to deduplicate registry.');
    }
    neek.unique(registryPath + '.temp', registryPath, async () => {
      try {
        await unlink(registryPath + '.temp');
      } catch (_) {
        return console.error(`Unable to delete intermediary registry.`);
      }

      console.log(`Registry deduplicated!`);
    });
  });
};

const clean = async ({registryPath = 'sitemap.txt'} = {}) => {
  try {
    await access(registryPath, fs.constants.F_OK);
  } catch (_) {
    return;
  }

  const lineReader = readline.createInterface({
    input: fs.createReadStream(registryPath),
  });

  lineReader.on('line', async line => {
    try {
      await unlink(line);
      console.log(`Deleted ${line}.`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return;
      }

      console.error(`Unable to delete ${line}`);
      console.error(err);
    }
  });

  lineReader.on('close', async () => {
    try {
      await writeFile(registryPath, '');
    } catch (_) {
      console.error(`Unable to clean ${registryAPath}`);
      return;
    }

    console.log('Done cleaning!');
  });
};

const molino = {
  buildPage,
  build,
  clean,
};

module.exports = molino;
