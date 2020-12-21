const fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
const Mustache = require('mustache');

const onWrite = ({outputPath, resolve, reject}) => err => {
  if (err) {
    reject(err);
    return;
  }

  resolve(`Built "${outputPath}"`);
};

const onReadLayout = ({viewData, outputPath, resolve, reject}) => (
  err,
  layout
) => {
  if (err) {
    reject(err);
    return;
  }

  const output = Mustache.render(layout.toString(), viewData);

  mkdirp(path.dirname(outputPath), function (err) {
    if (err) {
      reject(err);
      return;
    }

    fs.writeFile(outputPath, output, onWrite({outputPath, resolve, reject}));
  });
};

const buildLayout = ({sourcePath, outputPath, viewData}) => {
  return new Promise((resolve, reject) => {
    fs.readFile(
      sourcePath,
      onReadLayout({outputPath, viewData, resolve, reject})
    );
  });
};

module.exports = buildLayout;
