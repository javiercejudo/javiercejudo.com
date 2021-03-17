#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');
const makeMd = require('markdown-it');
const hljs = require('highlight.js');
const molino = require('../lib/molino');

const builders = require('../src/pages/builders');
const siteData = require('../src/siteData');

const loadComponent = componentPath =>
  fs.readFileSync(componentPath).toString();

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
    Mustache.render(template, viewData, {
      postsList: loadComponent(
        path.join('src', 'components', 'posts-list', 'index.mustache')
      ),
    });

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
      site: siteData,
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
    const pagesInfo = builders.map(pageBuilder =>
      pageBuilder({buildPage, mustacheRender, identityRender, md})
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
