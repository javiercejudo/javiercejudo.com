const path = require('path');
const buildPage = require('../../../lib/buildPage');

const buildContact = async () => {
  const outputPathArray = ['src', 'static', 'contact.html'];

  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.html'),
    outputPathArray,
    templateViewData: {
      title: 'Contact me - javiercejudo.com',
      description: 'Get in touch',
    },
  });
};

module.exports = buildContact;
