const postsData = require('./posts-collection/data');

const blogData = {
  path: 'news',
  hasPosts: postsData.length > 0,
  posts: postsData,
};

module.exports = blogData;