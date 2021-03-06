const buildBlogHome = require('./build');
const buildPost = require('./posts-collection/build');
const postsData = require('./posts-collection/data');

const blogBuilders = [buildBlogHome, ...postsData.map(buildPost)];

module.exports = blogBuilders;
