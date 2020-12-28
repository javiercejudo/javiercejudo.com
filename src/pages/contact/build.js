const path = require('path');
const Mustache = require('mustache');

const buildContact = async ({buildPage}) => {
  await buildPage({
    relativeOutputPath: 'contact.html',
    pageSourcePath: path.join(__dirname, 'template.html'),
    transformLayout: (layout, viewData) =>
      Mustache.render(layout, {
        ...viewData,
        title: 'Contact me - javiercejudo.com',
        description: 'Get in touch',
      }),
  });
};

module.exports = buildContact;
