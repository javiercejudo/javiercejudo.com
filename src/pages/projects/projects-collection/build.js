const path = require('path');

/** @typedef {import('../../../../scripts/build-pages').MainLayout} MainLayout */

/** @typedef {import('./data').Project} ProjectPage */

/** @typedef {import('../../../../scripts/build-pages').Builder<MainLayout, ProjectPage>} ProjectBuilder */

/**
 * @param {import('./data').Project} project
 */
const buildProject = project => {
  /** @type ProjectBuilder */
  const builder = ({buildPage}) =>
    buildPage({
      pageSourcePath: path.join(__dirname, 'template.mustache'),
      relativeOutputPath: path.join('projects', ...project.path.split('/')),
      layoutData: () => ({
        title: `Project: ${project.name} - javiercejudo.com`,
        description: project.description,
      }),
      pageData: () => ({
        ...project,
      }),
    });

  return builder;
};

module.exports = buildProject;
