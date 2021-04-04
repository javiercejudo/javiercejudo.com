const path = require('path');

/** @type string[] */
const postDataPaths = [
  './posts/thoughts-on-the-status-of-web-development',
  './posts/ultimate-frontend-email-validation',
  './posts/microdata-for-rich-snippets',
  './posts/css-limitations-on-ie',
];

/**
 * @typedef Post
 * @property {string} title
 * @property {string} date
 * @property {string} description
 * @property {string} outputPath
 * @property {string[]} categories
 * @property {boolean} [withHighlightJs]
 * @property {string} dataPath
 * @property {string} sourcePath
 * @property {Post} [prev]
 * @property {Post} [next]
 */

/**
 * @typedef {Omit<Post, 'prev' | 'next'>} BasicPost
 */

/**
 * @param {string} dataPath
 * @returns {BasicPost}
 */
const postsMapper = dataPath => {
  const postData = require(dataPath);

  return {
    ...postData,
    dataPath,
    sourcePath: path.join(...dataPath.split('/'), 'index.md'),
  };
};

const basicPosts = postDataPaths.map(postsMapper);

basicPosts.sort((a, b) => {
  if (a.date > b.date) {
    return -1;
  }

  return a.date < b.date ? 1 : 0;
});

/**
 * @param {BasicPost} basicPost
 * @param {number} index
 * @param {BasicPost[]} basicPosts
 * @returns {Post}
 */
const postEnhancer = (basicPost, index, basicPosts) => {
  return {
    ...basicPost,
    prev: index === 0 ? undefined : basicPosts[index - 1],
    next: index === basicPosts.length - 1 ? undefined : basicPosts[index + 1],
  };
};

const enhancedPosts = basicPosts.map(postEnhancer);

module.exports = enhancedPosts;
