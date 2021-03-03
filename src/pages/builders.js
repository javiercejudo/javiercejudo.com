const buildHome = require('./home/build');
const buildMenu = require('./menu/build');
const buildContact = require('./contact/build');
const buildAbout = require('./about/build');
const buildProjects = require('./projects/build');
const buildProject = require('./project/build');
const projects = require('./project/data');
const buildBlog = require('./blog/build');
const buildPosts = require('./posts-collection/build');
const postsData = require('./posts-collection/data');

const pageBuilders = [
  buildHome,
  buildMenu,
  buildContact,
  buildAbout,
  buildProjects,
  ...projects.map(buildProject),
  buildBlog,
  ...postsData.map(buildPosts),
];

module.exports = pageBuilders;
