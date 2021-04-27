const path = require('path');

/** @typedef {import('../../../scripts/build-pages').MainLayout} MainLayout */

/** @typedef {import('../../../scripts/build-pages').Builder<MainLayout, {}>} GameBuilder */

/** @type GameBuilder */
const gameBuilder = ({buildPage, identityRender}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join('game', 'index.html'),
    layoutData: () => ({
      title: 'Game - javiercejudo.com',
      description: 'Secretary problem online game',
      pageClass: 'game-page',
      styles: ['game/index.css'],
      scripts: ['game/index.js'],
    }),
  });

module.exports = gameBuilder;
