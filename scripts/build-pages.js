#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const Mustache = require('mustache');
const molino = require('../lib/molino');

const builders = require('../src/pages/builders');
const md = require('../src/utils/md');

const siteUrl = process.env.URL;

if (!siteUrl) {
  throw Error('Missing URL environment variable');
}

/**
 * @template T
 * @callback Identity
 * @param {T} x
 * @returns {T}
 */

/** @type Identity<string> */
const identityRender = x => x;

/**
 * @type {typeof Mustache.render}
 */
const mustacheRender = (template, viewData) =>
  Mustache.render(template, viewData);

/**
 * @typedef EditLink
 * @property {string} linkHref
 * @property {string} linkText
 */
/**
 * @typedef MainLayout
 * @property {string} title
 * @property {string} description
 * @property {string} [pagePath]
 * @property {boolean} [pageIsHome]
 * @property {string[]} [styles]
 * @property {string[]} [scripts]
 * @property {EditLink[]} [editLinks]
 */

/**
 * @typedef CommonData
 * @property {string} lang
 * @property {string} siteUrl
 * @property {string} currentYear
 */

/**
 * @typedef TemplateHelpers
 * @property {molino.TemplateHelpers} molino
 * @property {CommonData} commonData
 * @property {string} pagePath
 * @property {EditLink[]} editLinks
 */

/**
 * @template Layout
 * @callback LayoutData
 * @param {string} content
 * @param {TemplateHelpers} helpers
 * @returns {{content?: string, molino?: molino.TemplateHelpers, commonData?: CommonData, pagePath?: string, editLinks?: EditLink[]} & Layout}
 */

/**
 * @template Page
 * @callback PageData
 * @param {TemplateHelpers} helpers
 * @returns {{molino?: molino.TemplateHelpers, commonData?: CommonData, pagePath?: string, editLinks?: EditLink[]} & Page}
 */

/**
 * @template Layout, Page
 * @typedef BuildPageProps
 * @property {string} [sourceFolderPath]
 * @property {string} pageSourcePath
 * @property {string} relativeOutputPath
 * @property {string} [layoutFolderPath]
 * @property {string} [relativeLayoutSourcePath]
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
 * @property {Identity<string>} identityRender
 * @property {molino.RenderFn<Layout | Page>} mustacheRender
 * @property {typeof md} md
 */

/**
 * @template Layout, Page
 * @callback Builder
 * @param {BuilderProps<Layout, Page>} props
 * @returns {Promise<molino.BuiltPageInfo>}
 */

/**
 * @param {molino.TemplateHelpers} molino
 */
const getPagePath = molino => `${molino.baseHref}${molino.relativeOutputPath}`;

/**
 * @returns {Promise<molino.BuiltPageInfo>[]}
 */
const siteBuilder = () => {
  /**
   * @type BuildPage<any, any>
   */
  const buildPage = ({
    sourceFolderPath = path.join(__dirname, '..', 'src', 'pages'),
    pageSourcePath,
    relativeOutputPath,
    layoutFolderPath = path.join('src', 'layouts'),
    relativeLayoutSourcePath = 'main.mustache',
    layoutData = () => ({}),
    pageData = () => ({}),
    renderLayout = mustacheRender,
    renderPage = mustacheRender,
  }) => {
    const commonData = {
      lang: 'en-AU',
      siteUrl,
      currentYear: new Date().getFullYear().toString(),
    };

    const relativePageSourcePath = pageSourcePath
      .replace(sourceFolderPath, '')
      .slice(1);

    const editLinks = [
      {
        linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/layouts/${relativeLayoutSourcePath}`,
        linkText: 'Edit layout',
      },
      {
        linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/${relativePageSourcePath}`,
        linkText: 'Edit page',
      },
    ];

    return molino.buildPage({
      layoutFolderPath,
      relativeLayoutSourcePath,
      sourceFolderPath,
      relativePageSourcePath,
      relativeOutputPath,
      outputFolderPath: path.join('src', 'static'),
      layoutData: (content, molino) => {
        const pagePath = getPagePath(molino);

        return {
          content,
          molino,
          commonData,
          pagePath,
          editLinks,
          ...layoutData(content, {molino, commonData, pagePath, editLinks}),
        };
      },
      pageData: molino => {
        const pagePath = getPagePath(molino);

        return {
          molino,
          pagePath,
          editLinks,
          ...(pageData({molino, commonData, pagePath, editLinks})),
        };
      },
      renderLayout,
      renderPage,
    });
  };

  /**
   * @param {builders.Builder} pageBuilder
   * @returns {Promise<molino.BuiltPageInfo>}
   */
  const buildPageMapper = pageBuilder =>
    pageBuilder({
      buildPage,
      mustacheRender,
      identityRender,
      md,
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
