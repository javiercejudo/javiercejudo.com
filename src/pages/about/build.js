const path = require('path');

const buildAboutEn = async ({buildPage}) =>
  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.html'),
    relativeOutputPath: path.join('about-me', 'index.html'),
    layoutData: {
      title: 'About me - javiercejudo.com',
      description: 'Who am I?',
    },
    pageData: {
      intro: 'My name is Javier Cejudo and I am a software engineer.',
      readInLangs: 'Lee en otros idiomas',
      langs: [{lang: 'Español', path: path.join('sobre-mi', 'index.html')}],
    },
  });

const buildAboutEs = async ({buildPage}) =>
  await buildPage({
    pageSourcePath: path.join(__dirname, 'template.html'),
    relativeOutputPath: path.join('sobre-mi', 'index.html'),
    layoutData: {
      title: 'Sobre mí - javiercejudo.com',
      description: '¿Quién soy?',
    },
    pageData: {
      intro: 'Me llamo Javier Cejudo y soy ingeniero de software.',
      readInLangs: 'Lee en otros idiomas',
      langs: [{lang: 'English', path: path.join('about-me', 'index.html')}],
    },
  });

module.exports = {
  buildAboutEn,
  buildAboutEs,
};
