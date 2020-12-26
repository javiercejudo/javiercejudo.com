const projectsData = require('../project/data');

const homeData = {
  hasProjects: projectsData.length > 0,
  projects: projectsData,
};

module.exports = homeData;
