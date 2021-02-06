const fs = require('fs');
const util = require('util');
const path = require('path');
const readline = require('readline');
const makeDir = require('make-dir');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const identity = x => x;

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
  pageSourcePath,
  relativeOutputPath,
  layoutsFolderPath = 'layouts',
  layoutFilename = 'base.html',
  outputFolderPath = 'public',
  pageData = {},
  layoutData = {},
  renderPage = identity,
  renderLayout = identity,
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

  const renderPageWithData = template =>
    renderPage(template, {
      molino: templateHelpers,
      data: pageData,
    });

  const body = await renderPageHtml({
    sourcePath: pageSourcePath,
    render: renderPageWithData,
  });

  const html = await buildLayout({
    sourcePath: path.join(layoutsFolderPath, layoutFilename),
    outputPath,
    render: layout =>
      renderLayout(layout, {
        molino: {...templateHelpers, body},
        data: layoutData,
      }),
  });

  return {
    outputPath,
    html,
  };
};

const build = async ({
  siteBuilder,
  registryPath = 'molino-registry.txt',
}) => {
  fs.writeFile(registryPath, '', async err => {
    if (err) {
      console.error(err);
      return;
    }

    const registryStream = fs.createWriteStream(registryPath, {
      flags: 'a',
    });

    try {
      const pagesInfo = await siteBuilder();

      pagesInfo.forEach(pageInfo => {
        registryStream.write(`${pageInfo.outputPath}\n`);
      });
    } catch (err) {
      console.error(err);
    } finally {
      registryStream.end();
    }
  });
};

const clean = ({registryPath = 'molino-registry.txt'} = {}) => {
  const lineReader = readline.createInterface({
    input: fs.createReadStream(registryPath),
  });

  lineReader.on('line', line => {
    fs.unlink(line, err => {
      if (!err) {
        return console.log(`Deleted ${line}`);
      }

      if (err.code === 'ENOENT') {
        return;
      }

      console.error(`Unable to delete ${line}`);
      console.error(err);
    });
  });
};

module.exports = {
  buildPage,
  build,
  clean,
};
