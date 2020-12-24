const path = require('path');
const buildPage = require('../lib/buildPage');

const buildProject = async project => {
  const outputPathArray = ['src', 'static', ...project.path.split('/')];

  await buildPage({
    pageSourcePath: path.join('src', 'pages', 'project', 'template.mustache'),
    pageViewData: {
      name: project.name,
      description: project.description,
    },
    outputPathArray,
    templateViewData: {
      title: `Project: ${project.name} - javiercejudo.com`,
      description: project.description,
    },
  });
};

module.exports = buildProject;
