#!/usr/bin/env node

const path = require('path');
const Mustache = require('mustache');
const molino = require('../lib/molino');

const buildHome = require('../src/pages/home/build');
const buildContact = require('../src/pages/contact/build');
const buildAbout = require('../src/pages/about/build');
const buildProject = require('../src/pages/project/build');
const projects = require('../src/pages/project/data');

const pageBuilders = [
  buildHome,
  buildContact,
  buildAbout,
  ...projects.map(buildProject),
];

const siteBuilder = async () => {
  const buildPage = ({
    pageSourcePath,
    relativeOutputPath,
    pageData = {},
    layoutData = {},
  }) => {
    const currentYear = new Date().getFullYear();
    const render = (template, viewData) => Mustache.render(template, viewData);

    return molino.buildPage({
      pageSourcePath,
      relativeOutputPath,
      layoutsFolderPath: path.join('src', 'layouts'),
      layoutFilename: 'main.mustache',
      outputFolderPath: path.join('src', 'static'),
      pageData: {currentYear, ...pageData},
      layoutData: {currentYear, ...layoutData},
      renderPage: render,
      renderLayout: render,
    });
  };

  try {
    const pagesInfo = await Promise.all(
      pageBuilders.map(pageBuilder => pageBuilder({buildPage}))
    );

    pagesInfo.forEach(pageInfo => {
      console.log(`Built ${pageInfo.outputPath}`);
    });

    console.log('Done.');

    return pagesInfo;
  } catch (err) {
    console.log('Someting went wrong:');
    console.log(err);
  }
};

molino.build({siteBuilder});
