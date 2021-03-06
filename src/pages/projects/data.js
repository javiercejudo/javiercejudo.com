const projectsData = require('./projects-collection/data');

const data = {
  hasProjects: projectsData.length > 0,
  projects: projectsData,
};

module.exports = data;
