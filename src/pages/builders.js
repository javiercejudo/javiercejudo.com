const homeBuilder = require('./home/builder');
const menuBuilder = require('./menu/builder');
const contactBuilder = require('./contact/builder');
const clockBuilder= require('./clock/builder');
const aboutBuilders = require('./about/builders');
const projectsBuilders = require('./projects/builders');
const blogBuilders = require('./blog/builders');

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
