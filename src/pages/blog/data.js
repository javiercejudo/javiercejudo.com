const posts = require('./posts-collection/data');

const path = 'blog';

const blogData = {
  path,
  title: 'Tech notes by Javier Cejudo',
  authorName: 'Javier Cejudo',
  posts,
};

module.exports = blogData;
