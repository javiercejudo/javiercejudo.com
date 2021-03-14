const path = require('path');
const blogData = require('./data');

const buildBlog = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'index.mustache'),
    relativeOutputPath: path.join(blogData.path, 'index.html'),
    layoutData: {
      title: 'Blog - javiercejudo.com',
      description: 'Javier Cejudo’s blog',
    },
    pageData: blogData,
  });

module.exports = buildBlog;
