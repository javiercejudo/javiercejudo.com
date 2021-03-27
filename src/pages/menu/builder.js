const path = require('path');
const blogData = require('../blog/data');
const clockData = require('../clock/data');

/** @type import('../builders').Builder */
const menuBuilder = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join('menu', 'index.html'),
    layoutData: (content, {molino, commonData}) => ({
      content,
      molino,
      commonData,
      title: 'Menu - javiercejudo.com',
      description: 'Find your way around my site',
      pageIsMenu: true,
      styles: ['menu/index.css'],
    }),
    pageData: ({molino}) => ({
      molino,
      blogPath: blogData.path,
      clockPath: clockData.path,
    }),
  });

module.exports = menuBuilder;
