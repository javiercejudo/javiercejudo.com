const path = require('path');
const projects = require('./projects-collection/data');

/** @typedef {import('../../../scripts/build-pages').MainLayout} MainLayout */

/**
 * @typedef ProjectsHomePage
 * @property {boolean} hasProjects
 * @property {projects.Project[]} projects
 */

/** @type import('../../../scripts/build-pages').Builder<MainLayout, ProjectsHomePage> */
const homeBuilder = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join('projects', 'index.html'),
    layoutData: (content, {molino, commonData}) => ({
      content,
      molino,
      commonData,
      title: 'Projects - javiercejudo.com',
      description: 'Javier Cejudo’s projects',
    }),
    pageData: ({molino}) => ({
      molino,
      hasProjects: projects.length > 0,
      projects,
    }),
  });

module.exports = homeBuilder;
