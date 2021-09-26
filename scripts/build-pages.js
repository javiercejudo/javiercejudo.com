#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');
const molino = require('../lib/molino2');

const builders = require('../src/pages/builders');
const md = require('../src/utils/md');

const siteUrl = process.env.URL;

if (!siteUrl) {
  throw Error('Missing URL environment variable');
}

/**
 * @template T
 * @callback RenderFn
 * @param {string} template
 * @param {T} data
 * @returns {Promise<string>}
 */

/**
 * @template T
 * @callback IdentityRenderFn
 * @param {T} x
 * @returns {Promise<T>}
 */

/** @type IdentityRenderFn<string> */
const identityRender = x => Promise.resolve(x);

/**
 * @param {string} template
 * @param {any} viewData
 * @returns {Promise<string>}
 */
const renderMustache = (template, viewData) =>
  Promise.resolve(Mustache.render(template, viewData));

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
 * @property {boolean} [pageIsMenu]
 * @property {string} [pageClass]
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
 * @property {molino.MolinoHelpers} molino
 * @property {CommonData} commonData
 * @property {string} pagePath
 * @property {EditLink[]} editLinks
 * @property {string} pageClass
 */

/**
 * @template Layout
 * @callback LayoutData
 * @param {string} content
 * @param {TemplateHelpers} helpers
 * @returns {{content?: string, molino?: molino.MolinoHelpers, commonData?: CommonData, pagePath?: string, editLinks?: EditLink[]} & Layout}
 */

/**
 * @template Page
 * @callback PageData
 * @param {TemplateHelpers} helpers
 * @returns {{molino?: molino.MolinoHelpers, commonData?: CommonData, pagePath?: string, editLinks?: EditLink[]} & Page}
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
 * @property {RenderFn<Page>} [renderPage]
 * @property {RenderFn<Layout>} [renderLayout]
 */

/**
 * @template Layout, Page
 * @callback BuildPage
 * @param {BuildPageProps<Layout, Page>} props
 * @returns {Promise<molino.BuildPageOutput>}
 */

/**
 * @template Layout, Page
 * @typedef BuilderProps
 * @property {BuildPage<Layout, Page>} buildPage
 * @property {IdentityRenderFn<string>} identityRender
 * @property {RenderFn<Layout | Page>} renderMustache
 * @property {typeof md} md
 */

/**
 * @template Layout, Page
 * @callback Builder
 * @param {BuilderProps<Layout, Page>} props
 * @returns {Promise<molino.BuildPageOutput>}
 */

/**
 * @returns {Promise<molino.BuildPageOutput>[]}
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
    renderLayout = renderMustache,
    renderPage = renderMustache,
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

    const pageClass = 'standard-page';

    return molino.buildPage({
      page: async templateHelpers => {
        const pagePath = `${templateHelpers.baseHref}${relativeOutputPath}`;

        const content = await renderPage(
          fs
            .readFileSync(path.join(sourceFolderPath, relativePageSourcePath))
            .toString(),
          {
            molino: templateHelpers,
            pagePath,
            editLinks,
            ...pageData({
              molino: templateHelpers,
              commonData,
              pagePath,
              editLinks,
              pageClass,
            }),
          }
        );

        return renderLayout(
          fs
            .readFileSync(path.join(layoutFolderPath, relativeLayoutSourcePath))
            .toString(),
          {
            content,
            molino: templateHelpers,
            commonData,
            pagePath,
            editLinks,
            pageClass,
            ...layoutData(content, {
              molino: templateHelpers,
              commonData,
              pagePath,
              editLinks,
              pageClass,
            }),
          }
        );
      },
      output: {
        publicPath: path.join('src', 'static'),
        relativePath: relativeOutputPath,
      },
    });
  };

  /**
   * @param {builders.Builder} pageBuilder
   * @returns {Promise<molino.BuildPageOutput>}
   */
  const buildPageMapper = pageBuilder =>
    pageBuilder({
      buildPage,
      renderMustache,
      identityRender,
      md,
    });

  try {
    const pagesInfo = builders.map(buildPageMapper);

    pagesInfo.forEach(pageInfo => {
      pageInfo.then(info => console.log(`Built ${info.path}.`));
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
