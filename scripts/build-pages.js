#!/usr/bin/env node

const path = require('path');
const Mustache = require('mustache');
const molino = require('../lib/molino');

const buildHome = require('../src/pages/home/build');
const buildContact = require('../src/pages/contact/build');
const buildAbout = require('../src/pages/about/build');
const buildProject = require('../src/pages/project/build');
const projects = require('../src/pages/project/data');

const render = Mustache.render;

const buildPage = molino({
  layoutsFolderPath: path.join('src', 'layouts'),
  layoutPath: 'main.mustache',
  outputFolderPath: path.join('src', 'static'),
  // you may add partials or other Mustache-specific options here
  render: (template, viewData) => Mustache.render(template, viewData),
});

const builders = [
  buildHome,
  buildContact,
  buildAbout,
  ...projects.map(buildProject),
];

Promise.all(builders.map(builder => builder({buildPage, render})))
  .then(pagesInfo => {
    pagesInfo.map(pageInfo => console.log(`Built ${pageInfo.outputPath}`));

    console.log('----');
    console.log('Done');
    console.log('----');
  })
  .catch(err => {
    console.log('----');
    console.log('Someting went wrong:');
    console.log(err);
    console.log('----');
  });
