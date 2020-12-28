const path = require('path');
const Mustache = require('mustache');

const buildContact = async ({buildPage, templateTransform}) => {
  await buildPage({
    relativeOutputPath: 'contact.html',
    pageSourcePath: path.join(__dirname, 'template.html'),
    transformLayout: templateTransform({
      data: {
        title: 'Contact me - javiercejudo.com',
        description: 'Get in touch',
      },
    }),
  });
};

module.exports = buildContact;
