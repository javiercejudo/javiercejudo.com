const path = require('path');
const buildPage = require('../../../lib/buildPage');

const buildAbout = async () => {
  const outputPathArray = ['src', 'static', 'about-me.html'];

  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.html'),
    outputPathArray,
    templateViewData: {
      title: 'About me - javiercejudo.com',
      description: 'Who am I?',
    },
  });
};

module.exports = buildAbout;
