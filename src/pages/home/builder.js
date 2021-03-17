const path = require('path');
const homeData = require('./data');

const homeBuilder = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: 'index.html',
    layoutData: {
      title: 'Homepage - javiercejudo.com',
      description: 'Javier Cejudo’s personal website',
      pageIsHome: true,
      styles: ['home/index.css'],
    },
    pageData: homeData,
  });

module.exports = homeBuilder;
