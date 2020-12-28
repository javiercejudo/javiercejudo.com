const path = require('path');
const Mustache = require('mustache');

const buildAbout = async ({buildPage, templateTransform}) => {
  await buildPage({
    relativeOutputPath: 'about-me.html',
    pageSourcePath: path.join(__dirname, 'template.html'),
    transformLayout: templateTransform({
      data: {
        title: 'About me - javiercejudo.com',
        description: 'Who am I?',
      },
    }),
  });
};

module.exports = buildAbout;
