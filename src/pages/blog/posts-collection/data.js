const path = require('path');

/** @type string[] */
const postDataPaths = [
  './posts/ultimate-frontend-email-validation',
  './posts/thoughts-on-the-status-of-web-development',
  './posts/microdata-for-rich-snippets',
  './posts/css-limitations-on-ie',
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
 * @property {boolean} [withHighlightJs]
 * @property {string} dataPath
 * @property {string} sourcePath
 */

/**
 * @param {string} dataPath
 * @returns {Post}
 */
const postsMapper = dataPath => {
  const postData = require(dataPath);

  return {
    ...postData,
    dataPath,
    sourcePath: path.join(...dataPath.split('/'), 'index.md'),
  };
};

const posts = postDataPaths.map(postsMapper);

module.exports = posts;
