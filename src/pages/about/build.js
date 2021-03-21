const path = require('path');

const aboutEnBuilder = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join('about-me', 'index.html'),
    layoutData: (content, {molino, commonData}) => ({
      content,
      molino,
      commonData,
      title: 'About me - javiercejudo.com',
      description: 'Who am I?',
    }),
    pageData: ({molino}) => ({
      molino,
      intro: 'My name is Javier Cejudo and I am a software engineer.',
      readInLangs: 'Lee en otros idiomas',
      langs: [{lang: 'Español', path: path.join('sobre-mi', 'index.html')}],
    }),
  });

const aboutEsBuilder = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join('sobre-mi', 'index.html'),
    layoutData: (content, {molino, commonData}) => ({
      content,
      molino,
      commonData,
      lang: 'es-ES',
      title: 'Sobre mí - javiercejudo.com',
      description: '¿Quién soy?',
    }),
    pageData: ({molino}) => ({
      molino,
      intro: 'Me llamo Javier Cejudo y soy ingeniero de software.',
      readInLangs: 'Lee en otros idiomas',
      langs: [{lang: 'English', path: path.join('about-me', 'index.html')}],
    }),
  });

module.exports = {
  aboutEnBuilder,
  aboutEsBuilder,
};
