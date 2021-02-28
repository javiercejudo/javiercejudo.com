const path = require('path');

const buildAbout = async ({buildPage, identityRender}) =>
  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.html'),
    relativeOutputPath: path.join('about-me', 'index.html'),
    layoutData: {
      title: 'About me - javiercejudo.com',
      description: 'Who am I?',
    },
    renderPage: identityRender,
  });

module.exports = buildAbout;
