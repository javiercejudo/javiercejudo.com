const path = require('path');
const blogData = require('./data');

const homeBuilder = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'index.mustache'),
    relativeOutputPath: path.join(blogData.path, 'index.html'),
    layoutData: {
      title: 'Blog - javiercejudo.com',
      description: 'Javier Cejudo’s blog',
    },
    layoutData: {
      styles: ['blog/index.css'],
    },
    pageData: blogData,
  });

module.exports = homeBuilder;
