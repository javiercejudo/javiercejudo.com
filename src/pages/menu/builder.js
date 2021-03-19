const path = require('path');
const blogData = require('../blog/data');
const clockData = require('../clock/data');

const menuBuilder = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join('menu', 'index.html'),
    layoutData: {
      title: 'Menu - javiercejudo.com',
      description: 'Find your way around my site',
      pageIsMenu: true,
      styles: ['menu/index.css'],
    },
    pageData: {
      blogPath: blogData.path,
      clockPath: clockData.path,
    },
  });

module.exports = menuBuilder;
