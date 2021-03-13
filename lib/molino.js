const fs = require('fs');
const util = require('util');
const path = require('path');
const readline = require('readline');
const makeDir = require('make-dir');
const neek = require('neek');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
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

  const body = await renderPageHtml({
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
        body,
        data: layoutData,
      }),
  });

  return {
    outputPath,
    html,
  };
};

const build = async ({siteBuilder, registryPath = 'molino-registry.txt'}) => {
  const registryStream = fs.createWriteStream(registryPath, {
    flags: 'a',
  });

  registryStream.write(`\n`);

  try {
    const pagesInfo = await siteBuilder();

    pagesInfo.forEach(pageInfo => {
      registryStream.write(`${pageInfo.outputPath}\n`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    registryStream.end(() => {
      fs.copyFile(registryPath, registryPath + '.temp', err => {
        if (err) {
          return console.error('Unable to deduplicate registry');
        }

        neek.unique(registryPath + '.temp', registryPath, () => {
          fs.unlink(registryPath + '.temp', err => {
            if (err) {
              return console.log(`Unable to delete intermediary registry`);
            }

            console.log(`Registry deduplicated!`);
          });
        });
      });
    });
  }
};

const clean = ({registryPath = 'molino-registry.txt'} = {}) => {
  fs.access(registryPath, fs.constants.F_OK, err => {
    if (err) {
      return;
    }

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

    lineReader.on('close', () => {
      fs.writeFile(registryPath, '', () => {
        if (err) {
          console.error(`Unable to clean ${registryAPath}`);
          return;
        }

        console.log('Done cleaning!');
      });
    });
  });
};

const molino = {
  buildPage,
  build,
  clean,
};

module.exports = molino;
