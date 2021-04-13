const homeBuilder = require('./home/builder');
const menuBuilder = require('./menu/builder');
const contactBuilder = require('./contact/builder');
const clockBuilder = require('./clock/builder');
const aboutBuilders = require('./about/builders');
const projectsBuilders = require('./projects/builders');
const blogBuilders = require('./blog/builders');

/** @typedef {import('../../scripts/build-pages').MainLayout} MainLayout */
/** @typedef {MainLayout} Layouts */

/** @typedef {import('../pages/home/builder').HomeBuilder} HomeBuilder */
/** @typedef {import('../pages/menu/builder').MenuBuilder} MenuBuilder */
/** @typedef {import('../pages/contact/builder').ContactBuilder} ContactBuilder */
/** @typedef {import('../pages/clock/builder').ClockBuilder} ClockBuilder */
/** @typedef {import('../pages/projects/homeBuilder').ProjectsHomeBuilder} ProjectsHomeBuilder */
/** @typedef {import('../pages/projects/projects-collection/build').ProjectBuilder} ProjectBuilder */

/** @typedef {HomeBuilder | MenuBuilder | ContactBuilder | ClockBuilder | ProjectsHomeBuilder | ProjectBuilder} Builder */

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
