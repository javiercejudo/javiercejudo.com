const homeBuilder = require('./homeBuilder');
const blogData = require('./data');
const postBuilder = require('./posts-collection/builder');
const postSsrBuilder = require('./posts-collection/builder2');
const feedBuilder = require('./feedBuilder');

/** @type import('../../../scripts/build-pages').Builder<any, any>[] */
const blogBuilders = [
  homeBuilder,
  postSsrBuilder({blogPath: blogData.path}),
  ...blogData.posts.map(post => postBuilder({blogPath: blogData.path, post})),
  feedBuilder,
];

module.exports = blogBuilders;
