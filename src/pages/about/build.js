const path = require('path');

const buildAbout = async ({buildPage}) =>
  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.html'),
    relativeOutputPath: 'about-me.html',
    layoutData: {
      title: 'About me - javiercejudo.com',
      description: 'Who am I?',
    },
  });

module.exports = buildAbout;
