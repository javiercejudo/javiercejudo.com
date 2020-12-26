const path = require('path');
const Mustache = require('mustache');
const homeData = require('./data');

const buildHome = async ({buildPage}) => {
  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    outputPathArray: ['src', 'static', 'index.html'],
    transformPage: page => Mustache.render(page, homeData),
    transformLayout: (layout, viewData) =>
      Mustache.render(layout, {
        ...viewData,
        title: 'Homepage - javiercejudo.com',
        description: 'Javier Cejudo’s personal website',
      }),
  });
};

module.exports = buildHome;
