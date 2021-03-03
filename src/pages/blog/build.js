const path = require('path');
const blogData = require('./data');

const buildBlog = async ({buildPage}) =>
  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join('blog', 'index.html'),
    layoutData: {
      title: 'Blog - javiercejudo.com',
      description: 'Javier Cejudo’s blog',
    },
    pageData: blogData,
  });

module.exports = buildBlog;
