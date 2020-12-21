const path = require('path');
const buildPage = require('../lib/buildPage');
const buildLayout = require('../lib/buildLayout');
const viewData = require('../../../src/pages/home/data');

const buildHome = async () => {
  try {
    const body = await buildPage({
      sourcePath: path.join('src', 'pages', 'home', 'template.mustache'),
      viewData,
    });

    const doneMessage = await buildLayout({
      sourcePath: path.join('src', 'layouts', 'main.mustache'),
      outputPath: path.join('src', 'generated', 'index.html'),
      viewData: {
        homePath: '../',
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
