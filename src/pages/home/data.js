const postsData = require('../blog/data');
const projectsData = require('../projects/projects-collection/data');

const homeData = {
  hasProjects: projectsData.length > 0,
  projects: projectsData,
  hasPosts: postsData.posts.length > 0,
  postsData,
};

module.exports = homeData;
