#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const Mustache = require('mustache');
const makeMd = require('markdown-it');
const hljs = require('highlight.js');
const molino = require('../lib/molino');

const builders = require('../src/pages/builders');

const siteUrl = process.env.URL;

if (!siteUrl) {
  throw Error('Missing URL environment variable');
}

/**
 * @template Data
 * @callback MustacheRender
 * @param {string} template
 * @param {Data} viewData
 * @returns {string}
 */

/**
 * @template Data
 * @type MustacheRender<Data>
 */
const mustacheRender = (template, viewData) =>
  Mustache.render(template, viewData);

/**
 * @typedef MainLayout
 * @property {string} title
 * @property {string} description
 * @property {boolean} [pageIsHome]
 * @property {string[]} [styles]
 * @property {string[]} [scripts]
 */

/**
 * @typedef CommonData
 * @property {string} lang
 * @property {string} siteUrl
 * @property {number} currentYear
 */

/**
 * @typedef TemplateHelpers
 * @property {molino.TemplateHelpers} molino
 * @property {CommonData} commonData
 */

/**
 * @template Layout
 * @callback LayoutData
 * @param {string} content
 * @param {TemplateHelpers} molino
 * @returns {{content?: string, molino?: molino.TemplateHelpers, commonData?: CommonData} & Layout}
 */

/**
 * @template Page
 * @callback PageData
 * @param {TemplateHelpers} molino
 * @returns {{molino?: molino.TemplateHelpers, commonData?: CommonData} & Page}
 */

/**
 * @template Layout, Page
 * @typedef BuildPageProps
 * @property {string} pageSourcePath
 * @property {string} relativeOutputPath
 * @property {string} [layoutPath]
 * @property {LayoutData<Layout>} [layoutData]
 * @property {PageData<Page>} [pageData]
 * @property {molino.RenderFn<Layout>} [renderLayout]
 * @property {molino.RenderFn<Page>} [renderPage]
 */

/**
 * @template Layout, Page
 * @callback BuildPage
 * @param {BuildPageProps<Layout, Page>} props
 * @returns {Promise<molino.BuiltPageInfo>}
 */

/**
 * @template Layout, Page
 * @typedef BuilderProps
 * @property {BuildPage<Layout, Page>} buildPage
 * @property {any} identityRender
 * @property {any} mustacheRender
 * @property {any} loadComponent
 * @property {any} md
 */

/**
 * @template Layout, Page
 * @callback Builder
 * @param {BuilderProps<Layout, Page>} props
 * @returns {Promise<molino.BuiltPageInfo>}
 */

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
 * @returns {Promise<molino.BuiltPageInfo>[]}
 */
const siteBuilder = () => {
  /**
   * @template T
   * @param {T} x - A generic parameter that flows through to the return type
   * @return {T}
   */
  const identityRender = x => x;

  /**
   * @template Layout, Page
   * @type BuildPage<Layout, Page>
   */
  const buildPage = ({
    pageSourcePath,
    relativeOutputPath,
    layoutPath = path.join('src', 'layouts', 'main.mustache'),
    layoutData = () => ({}),
    pageData = () => ({}),
    renderLayout = mustacheRender,
    renderPage = mustacheRender,
  }) => {
    const commonData = {
      lang: 'en-AU',
      siteUrl,
      currentYear: new Date().getFullYear(),
    };

    return molino.buildPage({
      pageSourcePath,
      relativeOutputPath,
      layoutPath,
      outputFolderPath: path.join('src', 'static'),
      // @ts-ignore
      layoutData: (content, molino) => ({
        content,
        molino,
        commonData,
        ...layoutData(content, {molino, commonData}),
      }),
      // @ts-ignore
      pageData: molino => ({
        molino,
        ...pageData({molino, commonData}),
      }),
      // @ts-ignore
      renderLayout,
      // @ts-ignore
      renderPage,
    });
  };

  /**
   * @template Layout, Page
   * @param {Builder<Layout, Page>} pageBuilder
   * @returns {Promise<molino.BuiltPageInfo>}
   */
  const buildPageMapper = pageBuilder =>
    pageBuilder({
      // @ts-ignore
      buildPage,
      mustacheRender,
      identityRender,
      md,
      loadComponent,
    });

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
