const blogData = require('../blog/data');
const projectsData = require('../projects/projects-collection/data');

const homeData = {
  hasProjects: projectsData.length > 0,
  projects: projectsData,
  hasPosts: blogData.posts.length > 0,
  blogData,
  component: {
    postsList: blogData.component.postsList,
  },
};

module.exports = homeData;
