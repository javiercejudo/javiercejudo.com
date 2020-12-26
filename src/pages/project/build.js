const path = require('path');
const Mustache = require('mustache');
const buildPage = require('../../../lib/buildPage');

const buildProject = async project => {
  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    outputPathArray: ['src', 'static', ...project.path.split('/')],
    transformPage: page => Mustache.render(page, project),
    transformLayout: (layout, viewData) =>
      Mustache.render(layout, {
        ...viewData,
        title: `Project: ${project.name} - javiercejudo.com`,
        description: project.description,
      }),
  });
};

module.exports = buildProject;
