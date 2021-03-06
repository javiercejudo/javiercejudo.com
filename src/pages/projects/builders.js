const buildProjectsHome = require('./build');
const buildProject = require('./projects-collection/build');
const projects = require('./projects-collection/data');

const builders = [buildProjectsHome, ...projects.map(buildProject)];

module.exports = builders;
