const path = require('path');
const buildPage = require('../lib/buildPage');

const customBuildPage = ({
  templateSourcePath = path.join(__dirname, 'layouts', 'main.mustache'),
} = {}) => async buildPageOptions => {
  // The 3 comes from ignoring 'src', 'static', and the filename
  const baseHref =
    '../'.repeat(buildPageOptions.outputPath.split(path.sep).length - 3) ||
    './';

  await buildPage({
    baseHref,
    templateSourcePath,
    ...buildPageOptions,
  });
};

module.exports = customBuildPage;
