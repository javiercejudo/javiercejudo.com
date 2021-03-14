const path = require('path');

const buildProject = project => ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join('projects', ...project.path.split('/')),
    layoutData: {
      title: `Project: ${project.name} - javiercejudo.com`,
      description: project.description,
    },
    pageData: project,
  });

module.exports = buildProject;
