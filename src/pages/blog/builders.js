const buildBlogHome = require('./build');
const blogData = require('./data');
const buildPost = require('./posts-collection/build');

const blogBuilders = [
  buildBlogHome,
  ...blogData.posts.map(postData =>
    buildPost({blogPath: blogData.path, postData})
  ),
];

module.exports = blogBuilders;
