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

const buildPage = async ({
  pageSourcePath,
  outputPathArray,
  templateSourcePath = path.join('src', 'layouts', 'main.mustache'),
  transformPage = identity,
  transformLayout = identity,
}) => {
  try {
    const body = await renderPageHtml({
      sourcePath: pageSourcePath,
      transform: transformPage,
    });

    const outputPath = path.join(...outputPathArray);

    await buildLayout({
      sourcePath: templateSourcePath,
      outputPath,
      transform: layout =>
        transformLayout(layout, {
          static: '../'.repeat(outputPathArray.length - 3) || './',
          isProd: process.env.NODE_ENV === 'production',
          isDev: process.env.NODE_ENV === 'development',
          body,
        }),
    });

    console.log(`Built ${outputPath}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = buildPage;
