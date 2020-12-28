const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');

const identity = x => x;

const renderPageHtml = async ({sourcePath, transform}) => {
  return new Promise((resolve, reject) => {
    const onReadPage = (err, page) => {
      if (err) {
        return reject(err);
      }

      resolve(transform(page.toString()));
    };

    fs.readFile(sourcePath, onReadPage);
  });
};

const buildLayout = ({sourcePath, outputPath, transform}) => {
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

      const output = transform(layout.toString());

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
  defaultTemplatesFolderPath,
  defaultTemplatePath,
  defaultOutputFolderPath,
  publicFolderDepth = 1,
} = {}) => async ({
  pageSourcePath,
  outputFolderPath = defaultOutputFolderPath,
  relativeOutputPath,
  templatesFolderPath = defaultTemplatesFolderPath,
  templatePath = defaultTemplatePath,
  transformPage = identity,
  transformLayout = identity,
}) => {
  const outputPath = path.join(outputFolderPath, relativeOutputPath);

  const baseDistance =
    outputPath.split(path.sep).length - (publicFolderDepth + 1);

  const templateHelpers = {
    baseHref: '../'.repeat(baseDistance) || './',
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
  };

  try {
    const body = await renderPageHtml({
      sourcePath: pageSourcePath,
      transform: page => transformPage(page, templateHelpers),
    });

    await buildLayout({
      sourcePath: path.join(templatesFolderPath, templatePath),
      outputPath,
      transform: layout =>
        transformLayout(layout, {
          ...templateHelpers,
          body,
        }),
    });

    console.log(`Built ${outputPath}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = makeBuildPage;
