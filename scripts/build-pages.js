#!/usr/bin/env node

const path = require('path');
const Mustache = require('mustache');
const molino = require('../lib/molino');

const buildHome = require('../src/pages/home/build');
const buildContact = require('../src/pages/contact/build');
const buildAbout = require('../src/pages/about/build');
const buildProject = require('../src/pages/project/build');
const projects = require('../src/pages/project/data');

const mustachePartials = {};

const builders = [
  buildHome,
  buildContact,
  buildAbout,
  ...projects.map(buildProject),
];

const siteBuilder = async ({configureBuildPage}) => {
  const buildPage = configureBuildPage({
    layoutsFolderPath: path.join('src', 'layouts'),
    layoutPath: 'main.mustache',
    outputFolderPath: path.join('src', 'static'),
    // you may add partials or other Mustache-specific options here
    render: (template, viewData) =>
      Mustache.render(template, viewData, mustachePartials),
  });

  try {
    const pagesInfo = await Promise.all(
      builders.map(builder => builder({buildPage}))
    );
    pagesInfo.map(pageInfo => console.log(`Built ${pageInfo.outputPath}`));

    console.log('Done');
  } catch (err) {
    console.log('Someting went wrong:');
    console.log(err);
  }
};

molino.build({builders, siteBuilder});
