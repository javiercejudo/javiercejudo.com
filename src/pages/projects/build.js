const path = require('path');
const projectsData = require('./data');

const buildHome = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join('projects', 'index.html'),
    layoutData: {
      title: 'Projects - javiercejudo.com',
      description: 'Javier Cejudo’s projects',
    },
    pageData: projectsData,
  });

module.exports = buildHome;
