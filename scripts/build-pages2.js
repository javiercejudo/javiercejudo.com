#!/usr/bin/env node

const path = require('path');
const Mustache = require('mustache');
const {html} = require('common-tags');
const molino = require('../lib/molino2');
const homeBuilder = require('../src/pages/home/builder');
const md = require('../src/utils/md');
const MainLayout = require('../src/layouts/main');

const siteUrl = process.env.URL;

if (!siteUrl) {
  throw Error('Missing URL environment variable');
}

/**
 * @typedef CustomHelpers
 * @property {string} lang
 * @property {string} siteUrl
 * @property {number} currentYear
 */

/** @type CustomHelpers */
const customHelpers = {
  lang: 'en-AU',
  siteUrl,
  currentYear: new Date().getFullYear(),
};

/**
 * @callback RenderMustache
 * @param {string} template
 * @param {Record<string, unknown>} viewData
 * @returns {Promise<string>}
 */

/**
 * @type RenderMustache
 */
const renderMustache = (template, viewData) =>
  Promise.resolve(Mustache.render(template, viewData));

/**
 * @typedef BuilderInput
 * @property {typeof molino.buildPage} buildPage
 * @property {CustomHelpers} customHelpers
 * @property {import('../src/layouts/main').MainLayout} MainLayout
 * @property {RenderMustache} renderMustache
 * @property {typeof md} md
 * @property {import('common-tags').TemplateTag} html
 */

/**
 * @callback Builder
 * @param {BuilderInput} input
 * @returns {Promise<molino.BuildPageOutput>}
 */

/** @type Builder[] */
const builders = [homeBuilder];

/**
 * @returns {Promise<molino.BuildPageOutput>[]}
 */
const siteBuilder = () => {
  /** @param {Builder} pageBuilder */
  const buildPageMapper = pageBuilder =>
    pageBuilder({
      buildPage: async (...args) => {
        if (process.env.NODE_ENV !== 'development') {
          return molino.buildPage(...args);
        }

        try {
          return await molino.buildPage(...args);
        } catch (/** @type any */ e) {
          return Promise.resolve({
            html: html`<pre>${e.stack || e}</pre>`,
            path: path.join(
              args[0].output.publicPath,
              args[0].output.relativePath
            ),
          });
        }
      },
      customHelpers,
      MainLayout,
      renderMustache,
      html,
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
