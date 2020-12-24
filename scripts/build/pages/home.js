const path = require('path');
const buildPage = require('../lib/buildPage');
const pageViewData = require('../../../src/pages/home/data');

const buildHome = async () => {
  const outputPathArray = ['src', 'static', 'index.html'];

  await buildPage({
    pageSourcePath: path.join('src', 'pages', 'home', 'template.mustache'),
    pageViewData,
    outputPathArray,
    templateViewData: {
      title: 'Homepage - javiercejudo.com',
      description: 'Javier Cejudo’s personal website',
    },
  });
};

module.exports = buildHome;
