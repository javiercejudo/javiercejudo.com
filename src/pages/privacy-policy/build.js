const path = require('path');
const homeData = require('./data');

const buildHome = async ({buildPage}) =>
  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: 'index.html',
    data: homeData,
    layoutData: {
      title: 'Homepage - javiercejudo.com',
      description: 'Javier Cejudo’s personal website',
    },
  });

module.exports = buildHome;
