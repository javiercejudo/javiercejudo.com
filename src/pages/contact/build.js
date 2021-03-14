const path = require('path');

const buildContact = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.html'),
    relativeOutputPath: path.join('contact', 'index.html'),
    layoutData: {
      title: 'Contact me - javiercejudo.com',
      description: 'Get in touch',
    },
  });

module.exports = buildContact;
