const path = require('path');
const Mustache = require('mustache');

const buildAbout = async ({buildPage}) => {
  await buildPage({
    outputPath: path.join('src', 'static', 'about-me.html'),
    pageSourcePath: path.join(__dirname, 'template.html'),
    transformLayout: (layout, viewData) =>
      Mustache.render(layout, {
        ...viewData,
        title: 'About me - javiercejudo.com',
        description: 'Who am I?',
      }),
  });
};

module.exports = buildAbout;
