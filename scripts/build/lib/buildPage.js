const fs = require('fs');
const Mustache = require('mustache');

const buildPage = async ({sourcePath, viewData}) => {
  return new Promise((resolve, reject) => {
    const onReadPage = (err, page) => {
      if (err) {
        return reject(err);
      }

      resolve(Mustache.render(page.toString(), viewData));
    };

    fs.readFile(sourcePath, onReadPage);
  });
};

module.exports = buildPage;
