const path = require('path');
const Mustache = require('mustache');
const buildPage = require('../../../lib/buildPage');

const buildAbout = async () => {
  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.html'),
    outputPathArray: ['src', 'static', 'about-me.html'],
    transformLayout: (layout, viewData) =>
      Mustache.render(layout, {
        ...viewData,
        title: 'About me - javiercejudo.com',
        description: 'Who am I?',
      }),
  });
};

module.exports = buildAbout;
