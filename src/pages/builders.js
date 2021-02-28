const buildHome = require('./home/build');
const buildContact = require('./contact/build');
const buildAbout = require('./about/build');
const buildProject = require('./project/build');
const projects = require('./project/data');
const buildPosts = require('./posts-collection/build');
const postsData = require('./posts-collection/data');

const pageBuilders = [
  buildHome,
  buildContact,
  buildAbout,
  ...projects.map(buildProject),
  ...postsData.map(buildPosts),
];

module.exports = pageBuilders;
