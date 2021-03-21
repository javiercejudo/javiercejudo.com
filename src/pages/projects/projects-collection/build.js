const path = require('path');

const buildProject = project => ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join('projects', ...project.path.split('/')),
    layoutData: (content, {molino, commonData}) => ({
      content,
      molino,
      commonData,
      title: `Project: ${project.name} - javiercejudo.com`,
      description: project.description,
    }),
    pageData: ({molino}) => ({
      molino,
      ...project,
    }),
  });

module.exports = buildProject;
