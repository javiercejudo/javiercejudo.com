const path = require('path');

const contactBuilder = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.html'),
    relativeOutputPath: path.join('contact', 'index.html'),
    layoutData: (content, {molino, commonData}) => ({
      content,
      molino,
      commonData,
      title: 'Contact me - javiercejudo.com',
      description: 'Get in touch',
    }),
  });

module.exports = contactBuilder;
