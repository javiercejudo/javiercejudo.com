const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const Mustache = require('mustache');

const renderPageHtml = async ({sourcePath, viewData}) => {
  return new Promise((resolve, reject) => {
    const onReadPage = (err, page) => {
      if (err) {
        return reject(err);
      }

      const isStaticPage = viewData === null;

      if (isStaticPage) {
        return resolve(page.toString());
      }

      resolve(Mustache.render(page.toString(), viewData));
    };

    fs.readFile(sourcePath, onReadPage);
  });
};

const buildLayout = ({sourcePath, outputPath, viewData}) => {
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

      const output = Mustache.render(layout.toString(), viewData);

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
  pageViewData = null,
  outputPathArray,
  templateSourcePath = path.join('src', 'layouts', 'main.mustache'),
  templateViewData
}) => {
  try {
    const body = await renderPageHtml({
      sourcePath: pageSourcePath,
      viewData: pageViewData,
    });

    const outputPath = path.join(...outputPathArray);

    await buildLayout({
      sourcePath: templateSourcePath,
      outputPath,
      viewData: {
        ...templateViewData,
        static: '../'.repeat(outputPathArray.length - 3),
        body,
      },
    });

    console.log(`Built ${outputPath}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = buildPage;
