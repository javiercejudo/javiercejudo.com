const path = require('path');
const buildPage = require('../lib/buildPage');
const buildLayout = require('../lib/buildLayout');

const buildContact = async () => {
  try {
    const body = await buildPage({
      sourcePath: path.join('src', 'pages', 'contact', 'template.html'),
    });

    const outputPathParts = ['src', 'static', 'contact.html'];

    const doneMessage = await buildLayout({
      sourcePath: path.join('src', 'layouts', 'main.mustache'),
      outputPath: path.join(...outputPathParts),
      viewData: {
        static: '../'.repeat(outputPathParts.length - 3),
        title: 'Contact me - javiercejudo.com',
        description: 'Get in touch',
        body,
      },
    });

    console.log(doneMessage);
  } catch (err) {
    console.error(err);
  }
};

module.exports = buildContact;
