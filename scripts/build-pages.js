#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const Mustache = require('mustache');
const makeMd = require('markdown-it');
const hljs = require('highlight.js');
const molino = require('../lib/molino');

const builders = require('../src/pages/builders');

const loadComponent = async componentPath =>
  (await fs.readFile(componentPath)).toString();

const md = makeMd({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    );
  },
});

const siteBuilder = () => {
  const mustacheRender = (template, viewData) =>
    Mustache.render(template, viewData);

  const identityRender = x => x;

  const buildPage = ({
    pageData = () => ({}),
    layoutData = content => ({content}),
    renderPage = mustacheRender,
    renderLayout = mustacheRender,
    ...passThrough
  }) => {
    const commonData = {
      lang: 'en-AU',
      siteUrl: process.env.URL,
      currentYear: new Date().getFullYear(),
    };

    return molino.buildPage({
      layoutPath: path.join('src', 'layouts', 'main.mustache'),
      outputFolderPath: path.join('src', 'static'),
      layoutData: (content, molino) =>
        layoutData(content, {molino, commonData}),
      pageData: molino => pageData({molino, commonData}),
      renderLayout,
      renderPage,
      ...passThrough,
    });
  };

  try {
    const pagesInfo = builders.map(pageBuilder =>
      pageBuilder({
        buildPage,
        mustacheRender,
        identityRender,
        md,
        loadComponent,
      })
    );

    pagesInfo.forEach(pageInfo => {
      pageInfo.then(info => console.log(`Built ${info.outputPath}.`));
    });

    Promise.all(pagesInfo).then(() => {
      console.log('Done.');
    });

    return pagesInfo;
  } catch (err) {
    console.log('Someting went wrong building the site:');
    console.log(err);
  }
};

molino.build({siteBuilder});
