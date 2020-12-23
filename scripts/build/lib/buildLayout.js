const fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
const Mustache = require('mustache');

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

module.exports = buildLayout;
