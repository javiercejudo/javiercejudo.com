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

const posts = postsPaths.map(postPath => ({
  ...require(postPath),
  sourcePath: path.join(...postPath.split('/'), 'index.md'),
}));

module.exports = posts;
