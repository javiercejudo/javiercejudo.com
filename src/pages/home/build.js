const path = require('path');
const Mustache = require('mustache');
const homeData = require('./data');

const buildHome = async ({buildPage, templateTransform}) => {
  await buildPage({
    relativeOutputPath: 'index.html',
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    transformPage: templateTransform({data: homeData}),
    transformLayout: templateTransform({
      data: {
        title: 'Homepage - javiercejudo.com',
        description: 'Javier Cejudo’s personal website',
      },
    }),
  });
};

module.exports = buildHome;
