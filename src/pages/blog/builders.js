const homeBuilder = require('./homeBuilder');
const blogData = require('./data');
const postBuilder = require('./posts-collection/builder');
const feedBuilder = require('./feedBuilder');

const blogBuilders = [
  homeBuilder,
  ...blogData.posts.map(post => postBuilder({blogPath: blogData.path, post})),
  feedBuilder,
];

module.exports = blogBuilders;
