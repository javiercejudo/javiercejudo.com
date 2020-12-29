const path = require('path');
const homeData = require('./data');

const buildHome = async ({buildPage}) =>
  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: 'index.html',
    layoutData: {
      title: 'Homepage - javiercejudo.com',
      description: 'Javier Cejudo’s personal website',
    },
    data: homeData,
  });

module.exports = buildHome;
