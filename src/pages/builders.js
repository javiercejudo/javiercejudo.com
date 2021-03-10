const buildHome = require('./home/build');
const buildMenu = require('./menu/build');
const buildContact = require('./contact/build');
const buildClock= require('./clock/build');
const aboutBuilders = require('./about/builders');
const projectsBuilders = require('./projects/builders');
const blogBuilders = require('./blog/builders');

const builders = [
  buildHome,
  buildMenu,
  buildContact,
  buildClock,
  ...aboutBuilders,
  ...projectsBuilders,
  ...blogBuilders,
];

module.exports = builders;
