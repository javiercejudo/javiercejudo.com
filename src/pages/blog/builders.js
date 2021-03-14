const homeBuilder = require('./homeBuilder');
const blogData = require('./data');
const postBuilder = require('./posts-collection/builder');

const blogBuilders = [
  homeBuilder,
  ...blogData.posts.map(post => postBuilder({blogPath: blogData.path, post})),
];

module.exports = blogBuilders;
