const path = require('path');

const buildProject = project => async ({buildPage}) =>
  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join(...project.path.split('/')),
    layoutData: {
      title: `Project: ${project.name} - javiercejudo.com`,
      description: project.description,
    },
    data: project,
  });

module.exports = buildProject;
