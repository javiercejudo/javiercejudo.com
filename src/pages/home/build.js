const path = require('path');
const Mustache = require('mustache');
const homeData = require('./data');

const buildHome = async ({buildPage}) => {
  await buildPage({
    outputPath: path.join('src', 'static', 'index.html'),
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    transformPage: (page, viewData) =>
      Mustache.render(page, {...viewData, ...homeData}),
    transformLayout: (layout, viewData) =>
      Mustache.render(layout, {
        ...viewData,
        title: 'Homepage - javiercejudo.com',
        description: 'Javier Cejudo’s personal website',
      }),
  });
};

module.exports = buildHome;
