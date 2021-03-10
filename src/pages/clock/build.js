const path = require('path');

const buildClock = async ({buildPage, identityRender}) =>
  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join('clock', 'index.html'),
    layoutData: {
      title: 'Clock - javiercejudo.com',
      description: 'In case you were wondering what the time is',
    },
    renderPage: identityRender,
  });

module.exports = buildClock;
