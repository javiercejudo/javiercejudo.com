#!/usr/bin/env node

const path = require('path');
const {html} = require('common-tags');
const molino = require('../lib/molino2');
const homeBuilder = require('../src/pages/home/builder');
const contactBuilder = require('../src/pages/contact/builder');
const md = require('../src/utils/md');
const {mainLayout} = require('../src/layouts/main');

const siteUrl = process.env.URL;

if (!siteUrl) {
  throw Error('Missing URL environment variable');
}

/**
 * @typedef CustomHelpers
 * @property {string} lang
 * @property {string} siteUrl
 * @property {string} currentYear
 */

/** @type CustomHelpers */
const customHelpers = {
  lang: 'en-AU',
  siteUrl,
  currentYear: new Date().getFullYear().toString(),
};

/**
 * @callback PageWithMainLayoutFn
 * @param {molino.MolinoHelpers} input
 * @returns {Promise<Omit<import('../src/layouts/main.js').MainLayoutProps, keyof molino.MolinoHelpers | keyof customHelpers>>}
 */

/**
 *
 * @param {PageWithMainLayoutFn} pageFn
 * @returns {molino.PageRenderFn}
 */
const withMainLayout = pageFn => async molinoHelpers =>
  mainLayout({
    ...molinoHelpers,
    ...customHelpers,
    ...(await pageFn(molinoHelpers)),
  });

/**
 * @callback RenderMustache
 * @param {string} template
 * @param {Record<string, unknown>} viewData
 * @returns {Promise<string>}
 */

/**
 * @callback BuildPage
 * @param {{page: molino.PageRenderFn, path: string}} input
 * @returns {Promise<molino.BuildPageOutput>}
 */

/**
 * @typedef BuilderInput
 * @property {BuildPage} buildPage
 * @property {CustomHelpers} customHelpers
 * @property {typeof withMainLayout} withMainLayout
 * @property {typeof md} md
 * @property {import('common-tags').TemplateTag} html
 * @property {string} publicPath
 */

/**
 * @callback Builder
 * @param {BuilderInput} input
 * @returns {Promise<molino.BuildPageOutput>}
 */

/** @type Builder[] */
const builders = [homeBuilder, contactBuilder];

/**
 * @returns {Promise<molino.BuildPageOutput>[]}
 */
const siteBuilder = () => {
  const publicPath = path.join('src', 'static');

  /** @param {Builder} pageBuilder */
  const buildPageMapper = pageBuilder =>
    pageBuilder({
      buildPage: async ({page, path: relativePath}) => {
        try {
          return await molino.buildPage({
            page,
            output: {publicPath, relativePath},
          });
        } catch (/** @type any */ e) {
          if (process.env.NODE_ENV !== 'development') {
            console.log(e);
            throw e;
          }

          return Promise.resolve({
            html: `<!DOCTYPE html>
            <html lang="en" data-theme="jc-dark">
              <head>
                <meta charset="utf-8" />
                <title>Error: ${e.message}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
              </head>
              <body style="height: 100vh;">
                <div style="display: flex; align-items: center; justify-content:center; height: 50%;">
                  <pre style="white-space: pre-wrap; word-break: break-all;">${
                    e.stack || e
                  }</pre>
                </div>
              </body>
            </html>`,
            path: path.join(publicPath, relativePath),
          });
        }
      },
      customHelpers,
      withMainLayout,
      html,
      md,
      publicPath,
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
