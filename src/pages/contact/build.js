const path = require('path');

const buildContact = async ({buildPage}) =>
  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.html'),
    relativeOutputPath: 'contact.html',
    layoutData: {
      title: 'Contact me - javiercejudo.com',
      description: 'Get in touch',
    },
  });

module.exports = buildContact;
