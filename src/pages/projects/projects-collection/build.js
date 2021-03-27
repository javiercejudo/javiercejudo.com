const path = require('path');

/**
 * @param {any} project
 */
const buildProject = project => {
  /** @type import('../../builders').Builder */
  const builder = ({buildPage}) =>
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

  return builder;
};

module.exports = buildProject;
