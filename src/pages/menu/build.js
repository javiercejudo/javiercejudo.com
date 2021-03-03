const path = require('path');

const buildContact = async ({buildPage}) =>
  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.html'),
    relativeOutputPath: path.join('menu', 'index.html'),
    layoutData: {
      title: 'Menu - javiercejudo.com',
      description: 'Find your way around my site',
    },
  });

module.exports = buildContact;
