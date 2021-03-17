const posts = require('./posts-collection/data');

const path = 'blog';

const blogData = {
  path,
  title: 'Tech notes by Javier Cejudo',
  authorName: 'Javier Cejudo',
  hasPosts: posts.length > 0,
  posts,
  component: {
    postsList: {
      path,
      posts,
    },
  },
};

module.exports = blogData;
