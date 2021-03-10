const buildHome = require('./home/build');
const buildMenu = require('./menu/build');
const buildContact = require('./contact/build');
const buildAbout = require('./about/build');
const buildClock= require('./clock/build');
const projectsBuilders = require('./projects/builders');
const blogBuilders = require('./blog/builders');

const builders = [
  buildHome,
  buildMenu,
  buildContact,
  buildAbout,
  buildClock,
  ...projectsBuilders,
  ...blogBuilders,
];

module.exports = builders;
