const path = require('path');
const buildPage = require('../lib/buildPage');
const buildLayout = require('../lib/buildLayout');

const buildProject = async project => {
  try {
    const body = await buildPage({
      sourcePath: path.join('src', 'pages', 'project', 'template.mustache'),
      viewData: {
        name: project.name,
        description: project.description,
      },
    });

    const outputPathParts = [
      'src',
      'generated',
      ...project.path.split('/'),
      'index.html',
    ];

    const doneMessage = await buildLayout({
      sourcePath: path.join('src', 'layouts', 'main.mustache'),
      outputPath: path.join(...outputPathParts),
      viewData: {
        homePath: '../'.repeat(outputPathParts.length - 2),
        title: `Project: ${project.name} - javiercejudo.com`,
        description: project.description,
        body,
      },
    });

    console.log(doneMessage);
  } catch (err) {
    console.error(err);
  }
};

module.exports = buildProject;
