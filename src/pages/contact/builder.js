const path = require('path');

/** @typedef {import('../../../scripts/build-pages').MainLayout} MainLayout */

/** @type import('../../../scripts/build-pages').Builder<MainLayout, {}> */
const contactBuilder = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.html'),
    relativeOutputPath: path.join('contact', 'index.html'),
    layoutData: () => ({
      title: 'Contact me - javiercejudo.com',
      description: 'Get in touch',
    }),
  });

module.exports = contactBuilder;
