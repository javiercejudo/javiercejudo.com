const projects = require('../project/data')

const viewData = {
  hasProjects: projects.length > 0,
  projects,
};

module.exports = viewData;
