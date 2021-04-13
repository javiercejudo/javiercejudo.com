const path = require('path');
const projects = require('./projects-collection/data');

/** @typedef {import('../../../scripts/build-pages').MainLayout} MainLayout */

/**
 * @typedef ProjectsHomePage
 * @property {boolean} hasProjects
 * @property {projects.Project[]} projects
 */

/** @typedef {import('../../../scripts/build-pages').Builder<MainLayout, ProjectsHomePage>} ProjectsHomeBuilder */

/** @type ProjectsHomeBuilder */
const homeBuilder = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join('projects', 'index.html'),
    layoutData: () => ({
      title: 'Projects - javiercejudo.com',
      description: 'Javier Cejudo’s projects',
    }),
    pageData: () => ({
      hasProjects: projects.length > 0,
      projects,
    }),
  });

module.exports = homeBuilder;
