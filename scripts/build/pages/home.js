const path = require('path');
const buildPage = require('../lib/buildPage');
const buildLayout = require('../lib/buildLayout');

const buildHome = async () => {
  const projects = [
    {
      name: 'javiercejudo.com',
    },
    {
      name: 'Modelico',
    },
  ];

  try {
    const body = await buildPage({
      sourcePath: path.join('src', 'pages', 'home.mustache'),
      viewData: {
        hasProjects: projects.length > 0,
        projects,
      },
    });

    const doneMessage = await buildLayout({
      sourcePath: path.join('src', 'layouts', 'main.mustache'),
      outputPath: path.join('build', 'index.html'),
      viewData: {
        title: 'Homepage - javiercejudo.com',
        description: 'Javier Cejudo’s personal website',
        body,
      },
    });

    console.log(doneMessage);
  } catch (err) {
    console.error(err);
  }
};

module.exports = buildHome;
