const homeBuilder = require('./home/builder');
const menuBuilder = require('./menu/builder');
const contactBuilder = require('./contact/builder');
const clockBuilder = require('./clock/builder');
const aboutBuilders = require('./about/builders');
const projectsBuilders = require('./projects/builders');
const blogBuilders = require('./blog/builders');

/** @typedef {import('../../scripts/build-pages').MainLayout} MainLayout */
/** @typedef {MainLayout} Layouts */

/** @typedef {homeBuilder.HomeBuilder} HomeBuilder */
/** @typedef {menuBuilder.MenuBuilder} MenuBuilder */
/** @typedef {contactBuilder.ContactBuilder} ContactBuilder */
/** @typedef {clockBuilder.ClockBuilder} ClockBuilder */
/** @typedef {import('../pages/projects/homeBuilder').ProjectsHomeBuilder} ProjectsHomeBuilder */
/** @typedef {import('../pages/projects/projects-collection/build').ProjectBuilder} ProjectBuilder */

/**
 * @typedef {HomeBuilder | MenuBuilder | ContactBuilder | ClockBuilder | ProjectsHomeBuilder | ProjectBuilder} Builder
 **/

/** @type Builder[] */
const builders = [
  menuBuilder,
  contactBuilder,
  clockBuilder,
  ...aboutBuilders,
  ...projectsBuilders,
  ...blogBuilders,
  homeBuilder,
];

module.exports = builders;
