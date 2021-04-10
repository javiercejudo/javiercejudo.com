const homeBuilder = require('./homeBuilder');
const blogData = require('./data');
const posts = require('./posts-collection/data');
const postBuilder = require('./posts-collection/builder');
const postSsrBuilder = require('./posts-collection/builder-ssr');
const feedBuilder = require('./feedBuilder');

/** @type import('../../../scripts/build-pages').Builder<any, any>[] */
const blogBuilders = [
  homeBuilder,
  postSsrBuilder({blogPath: blogData.path}),
  ...posts.map(post => postBuilder({blogData, post})),
  feedBuilder,
];

module.exports = blogBuilders;
