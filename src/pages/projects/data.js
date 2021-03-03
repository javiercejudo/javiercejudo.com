const projectsData = require('../project/data');

const data = {
  hasProjects: projectsData.length > 0,
  projects: projectsData,
};

module.exports = data;
