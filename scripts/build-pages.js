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
  const mustacheRender = (template, viewData) =>
    Mustache.render(template, viewData);
  const identityRender = x => x;

  const buildPage = ({
    pageData = {},
    layoutData = {},
    renderPage = mustacheRender,
    renderLayout = mustacheRender,
    ...passThrough
  }) => {
    const commonData = {
      currentYear: new Date().getFullYear(),
    };

    return molino.buildPage({
      layoutPath: path.join('src', 'layouts', 'main.mustache'),
      outputFolderPath: path.join('src', 'static'),
      pageData: {...commonData, ...pageData},
      layoutData: {...commonData, ...layoutData},
      renderPage,
      renderLayout,
      ...passThrough,
    });
  };

  try {
    const pagesInfo = await Promise.all(
      pageBuilders.map(pageBuilder =>
        pageBuilder({buildPage, mustacheRender, identityRender})
      )
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
