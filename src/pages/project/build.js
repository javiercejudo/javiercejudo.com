const path = require('path');
const Mustache = require('mustache');

const buildProject = project => async ({buildPage, templateTransform}) => {
  await buildPage({
    relativeOutputPath: path.join(...project.path.split('/')),
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    transformPage: templateTransform({data: project}),
    transformLayout: templateTransform({
      data: {
        title: `Project: ${project.name} - javiercejudo.com`,
        description: project.description,
      },
    }),
  });
};

module.exports = buildProject;
