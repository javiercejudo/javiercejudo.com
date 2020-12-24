const fs = require('fs');
const Mustache = require('mustache');
const {isNullOrUndefined} = require('util');

const buildPage = async ({sourcePath, viewData = null}) => {
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

module.exports = buildPage;
