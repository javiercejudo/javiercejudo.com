const posts = require('./posts-collection/data');

const path = 'blog';

/**
 * @typedef BlogData
 * @property {string} path
 * @property {string} title
 * @property {string} authorName
 * @property {posts.Post[]} posts
 */

/** @type BlogData */
const blogData = {
  path,
  title: 'Tech notes by Javier Cejudo',
  authorName: 'Javier Cejudo',
  posts,
};

module.exports = blogData;
