const path = require('path');

/** @typedef {import('../../../scripts/build-pages').MainLayout} MainLayout */

/** @typedef {import('../../../scripts/build-pages').Builder<MainLayout, {}>} ContactBuilder */

/** @type ContactBuilder */
const contactBuilder = ({buildPage, identityRender}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.html'),
    relativeOutputPath: path.join('contact', 'index.html'),
    layoutData: () => ({
      title: 'Contact me - javiercejudo.com',
      description: 'Get in touch',
    }),
    renderPage: identityRender,
  });

module.exports = contactBuilder;
