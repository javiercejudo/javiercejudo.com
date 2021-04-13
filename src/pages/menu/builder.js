const path = require('path');
const blogData = require('../blog/data');
const clockData = require('../clock/data');

/** @typedef {import('../../../scripts/build-pages').MainLayout} MainLayout */

/**
 * @typedef MenuPage
 * @property {string} blogPath
 * @property {string} clockPath
 */

/** @typedef {import('../../../scripts/build-pages').Builder<MainLayout, MenuPage>} MenuBuilder */

/** @type MenuBuilder */
const menuBuilder = ({buildPage, identityRender}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join('menu', 'index.html'),
    layoutData: () => ({
      title: 'Menu - javiercejudo.com',
      description: 'Find your way around my site',
      pageIsMenu: true,
      styles: ['menu/index.css'],
    }),
    pageData: () => ({
      blogPath: blogData.path,
      clockPath: clockData.path,
    }),
  });

module.exports = menuBuilder;
