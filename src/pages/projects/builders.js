const homeBuilder = require('./homeBuilder');
const buildProject = require('./projects-collection/build');
const projects = require('./projects-collection/data');

const builders = [homeBuilder, ...projects.map(buildProject)];

module.exports = builders;
