const buildPage = require('../lib/buildPage');

const customBuildPage = ({
  templateSourcePath = path.join('src', 'layouts', 'main.mustache'),
} = {}) => async buildPageOptions =>
  await buildPage({
    templateSourcePath,
    ...buildPageOptions,
  });

module.exports = customBuildPage;
