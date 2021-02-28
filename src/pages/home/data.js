const postsData = require('../posts-collection/data');
const projectsData = require('../project/data');

const homeData = {
  hasProjects: projectsData.length > 0,
  projects: projectsData,
  hasPosts: postsData.length > 0,
  posts: postsData,
};

module.exports = homeData;
