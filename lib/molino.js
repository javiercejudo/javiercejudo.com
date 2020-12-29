const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

const identity = x => x;

const renderPageHtml = async ({sourcePath, render}) => {
  return new Promise((resolve, reject) => {
    const onReadPage = (err, page) => {
      if (err) {
        return reject(err);
      }

      resolve(render(page.toString()));
    };

    fs.readFile(sourcePath, onReadPage);
  });
};

const buildLayout = ({sourcePath, outputPath, render}) => {
  return new Promise((resolve, reject) => {
    const onWrite = err => {
      if (err) {
        return reject(err);
      }

      resolve(`Built "${outputPath}"`);
    };

    const onReadLayout = (err, layout) => {
      if (err) {
        return reject(err);
      }

      const output = render(layout.toString());

      mkdirp(path.dirname(outputPath), function (err) {
        if (err) {
          return reject(err);
        }

        fs.writeFile(outputPath, output, onWrite);
      });
    };

    fs.readFile(sourcePath, onReadLayout);
  });
};

const makeBuildPage = ({
  layoutsFolderPath: defaultLayoutsFolderPath = 'layouts',
  layoutPath: defaultLayoutPath = 'base.html',
  outputFolderPath: defaultOutputFolderPath = 'public',
  render: defaultRender = identity,
} = {}) => async ({
  pageSourcePath,
  relativeOutputPath,
  layoutsFolderPath = defaultLayoutsFolderPath,
  layoutPath = defaultLayoutPath,
  outputFolderPath = defaultOutputFolderPath,
  data = {},
  layoutData = {},
  renderPage = defaultRender,
  renderLayout = defaultRender,
}) => {
  const outputPath = path.join(outputFolderPath, relativeOutputPath);
  const publicFolderDepth = outputFolderPath.split(path.sep).length;

  const baseDistance =
    outputPath.split(path.sep).length - (publicFolderDepth + 1);

  const templateHelpers = {
    baseHref: '../'.repeat(baseDistance) || './',
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
  };

  const renderPageWithData = template =>
    renderPage(template, {...templateHelpers, ...data});

  try {
    const body = await renderPageHtml({
      sourcePath: pageSourcePath,
      render: renderPageWithData,
    });

    await buildLayout({
      sourcePath: path.join(layoutsFolderPath, layoutPath),
      outputPath,
      render: layout =>
        renderLayout(layout, {
          ...templateHelpers,
          ...layoutData,
          body,
        }),
    });

    console.log(`Built ${outputPath}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = makeBuildPage;
