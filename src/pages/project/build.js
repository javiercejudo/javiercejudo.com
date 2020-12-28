const path = require('path');
const Mustache = require('mustache');

const buildProject = project => async ({buildPage}) => {
  await buildPage({
    relativeOutputPath: path.join(...project.path.split('/')),
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    transformPage: (page, viewData) =>
      Mustache.render(page, {...viewData, ...project}),
    transformLayout: (layout, viewData) =>
      Mustache.render(layout, {
        ...viewData,
        title: `Project: ${project.name} - javiercejudo.com`,
        description: project.description,
      }),
  });
};

module.exports = buildProject;
