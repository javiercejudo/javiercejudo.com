const homeBuilder = require('./home/builder');
const menuBuilder = require('./menu/builder');
const contactBuilder = require('./contact/builder');
const clockBuilder= require('./clock/builder');
const aboutBuilders = require('./about/builders');
const projectsBuilders = require('./projects/builders');
const blogBuilders = require('./blog/builders');

/**
 * @typedef BuilderProps
 * @property {import('../../scripts/build-pages').BuildPage} buildPage
 * @property {any} identityRender
 * @property {any} mustacheRender
 * @property {any} loadComponent
 * @property {any} md
 */

/**
 * @callback Builder
 * @param {BuilderProps} props
 * @returns {Promise<import('../../lib/molino').BuiltPageInfo>}
 */

/** @type Builder[] */
const builders = [
  homeBuilder,
  menuBuilder,
  contactBuilder,
  clockBuilder,
  ...aboutBuilders,
  ...projectsBuilders,
  ...blogBuilders,
];

module.exports = builders;
