const path = require('path');

const postsPaths = ['./posts/intro', './posts/another-post'];

const postsData = postsPaths.map(postPath => ({
  ...require(postPath),
  sourcePath: path.join(...postPath.split('/'), 'index.md'),
}));

module.exports = postsData;
