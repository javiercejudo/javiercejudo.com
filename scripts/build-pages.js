#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const Mustache = require('mustache');
const makeMd = require('markdown-it');
const hljs = require('highlight.js');
const molino = require('../lib/molino');

const builders = require('../src/pages/builders');

/**
 *  @param {import("fs").PathLike | fs.FileHandle} componentPath
 */
const loadComponent = async componentPath =>
  (await fs.readFile(componentPath)).toString();

/** @type {ReturnType<typeof makeMd>} */
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

/**
 * @returns {Promise<import('../lib/molino').BuiltPageInfo>[]}
 */
const siteBuilder = () => {
  /** @type {import('../lib/molino').RenderFn} */
  const mustacheRender = (template, viewData) =>
    Mustache.render(template, viewData);

  /**
   * @template T
   * @param {T} x - A generic parameter that flows through to the return type
   * @return {T}
   */
  const identityRender = x => x;

  /**
   * @param {import('../src/pages/builders').Builder} pageBuilder
   * @returns {Promise<import('../lib/molino').BuiltPageInfo>}
   */
  const buildPageMapper = pageBuilder =>
    pageBuilder({
      buildPage,
      mustacheRender,
      identityRender,
      md,
      loadComponent,
    });

  /**
   * @typedef BuildPageProps
   * @property {string} pageSourcePath
   * @property {string} relativeOutputPath
   * @property {string} [layoutPath]
   * @property {import('../lib/molino').PageData} [pageData]
   * @property {import('../lib/molino').LayoutData} [layoutData]
   * @property {import('../lib/molino').RenderFn} [renderPage]
   * @property {import('../lib/molino').RenderFn} [renderLayout]
   */

  /**
   * @callback BuildPage
   * @param {BuildPageProps} props
   * @returns {Promise<import('../lib/molino').BuiltPageInfo>}
   */

  /** @type BuildPage */
  const buildPage = ({
    pageSourcePath,
    relativeOutputPath,
    layoutPath = path.join('src', 'layouts', 'main.mustache'),
    pageData = helpers => ({helpers}),
    layoutData = (content, helpers) => ({content, helpers}),
    renderPage = mustacheRender,
    renderLayout = mustacheRender,
  }) => {
    const commonData = {
      lang: 'en-AU',
      siteUrl: process.env.URL,
      currentYear: new Date().getFullYear(),
    };

    return molino.buildPage({
      pageSourcePath,
      relativeOutputPath,
      layoutPath,
      outputFolderPath: path.join('src', 'static'),
      layoutData: (content, molino) => ({
        content,
        molino,
        commonData,
        ...layoutData(content, {molino, commonData}),
      }),
      pageData: molino => ({
        molino,
        ...pageData({molino, commonData}),
      }),
      renderLayout,
      renderPage,
    });
  };

  try {
    const pagesInfo = builders.map(buildPageMapper);

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
    return [];
  }
};

molino.build({siteBuilder});
