const postsData = require('./posts-collection/data');

const blogData = {
  path: 'blog',
  title: 'Tech notes by Javier Cejudo',
  authorName: 'Javier Cejudo',
  hasPosts: postsData.length > 0,
  posts: postsData,
};

module.exports = blogData;
