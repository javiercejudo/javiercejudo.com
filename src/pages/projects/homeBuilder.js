const path = require('path');
const projectsData = require('./data');

/** @type import('../builders').Builder */
const homeBuilder = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join('projects', 'index.html'),
    layoutData: (content, {molino, commonData}) => ({
      content,
      molino,
      commonData,
      title: 'Projects - javiercejudo.com',
      description: 'Javier Cejudo’s projects',
    }),
    pageData: ({molino}) => ({
      molino,
      ...projectsData,
    }),
  });

module.exports = homeBuilder;
