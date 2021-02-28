#!/usr/bin/env node

const path = require('path');
const Mustache = require('mustache');
const makeMd = require('markdown-it');
const molino = require('../lib/molino');

const pageBuilders = require('../src/pages/builders');

const md = makeMd();

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
        pageBuilder({buildPage, mustacheRender, identityRender, md})
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
