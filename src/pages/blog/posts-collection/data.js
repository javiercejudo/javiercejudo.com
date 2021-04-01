const path = require('path');

const postsPaths = [
  './posts/2014-08-03-ultimate-frontend-email-validation',
  './posts/2014-07-12-thoughts-on-the-status-of-web-development',
  './posts/2013-12-23-microdata-for-rich-snippets',
  './posts/2013-12-15-css-limitations-on-ie',
];
// .sort((a, b) => {
//   if (a > b) {
//     return -1;
//   }

//   return a < b ? 1 : 0;
// });

/**
 * @typedef Post
 * @property {string} title
 * @property {string} date
 * @property {string} description
 * @property {string} outputPath
 * @property {string[]} categories
 * @property {string} sourcePath
 * @property {boolean} [withHighlightJs]
 */

/**
 * @param {string} postPath
 * @param {number} index
 * @returns {Post}
 */
const postsMapper = (postPath, index) => {
  const postData = require(postPath);

  return {
    ...postData,
    sourcePath: path.join(...postPath.split('/'), 'index.md'),
  };
};

const posts = postsPaths.map(postsMapper);

module.exports = posts;
