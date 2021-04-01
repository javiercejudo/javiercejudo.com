const path = require('path');
const clockData = require('./data');

/** @typedef {import('../../../scripts/build-pages').MainLayout} MainLayout */

/** @type import('../../../scripts/build-pages').Builder<MainLayout, {}> */
const clockBuilder = ({buildPage, identityRender}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join(...clockData.path.split('/')),
    layoutData: () => ({
      title: 'Clock - javiercejudo.com',
      description: 'In case you were wondering what the time is',
    }),
    renderPage: identityRender,
  });

module.exports = clockBuilder;
