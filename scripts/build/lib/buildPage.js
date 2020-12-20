const fs = require('fs');
const Mustache = require('mustache');

const onReadPage = ({viewData, resolve, reject}) => (err, page) => {
  if (err) {
    reject(err);
  }

  resolve(
    Mustache.render(page.toString(), viewData).replace(/^\s*[\r\n]/gm)
  );
};

const buildPage = async ({sourcePath, viewData}) => {
  return new Promise((resolve, reject) => {
    fs.readFile(sourcePath, onReadPage({viewData, resolve, reject}));
  });
};

module.exports = buildPage;
