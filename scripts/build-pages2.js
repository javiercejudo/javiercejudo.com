#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');
const molino = require('../lib/molino2');
const homeBuilder = require('../src/pages/home/builder');
const md = require('../src/utils/md');

const siteUrl = process.env.URL;

if (!siteUrl) {
  throw Error('Missing URL environment variable');
}

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
 * @typedef EditLink
 * @property {string} linkHref
 * @property {string} linkText
 */

/**
 * @typedef MainLayoutData
 * @property {import('../lib/molino2').TemplateHelpers} molino
 * @property {string} title
 * @property {string} description
 * @property {string} content
 * @property {string} [pagePath]
 * @property {boolean} [pageIsHome]
 * @property {boolean} [pageIsMenu]
 * @property {string} [pageClass]
 * @property {string[]} [styles]
 * @property {string[]} [scripts]
 * @property {EditLink[]} [editLinks]
 */

/**
 * @callback MainLayout
 * @param {MainLayoutData} input
 * @returns {Promise<string>}
 */

const mainLayoutTemplate = fs
  .readFileSync(path.join('src', 'layouts', 'main.mustache'))
  .toString();

const commonData = {
  lang: 'en-AU',
  siteUrl,
  currentYear: new Date().getFullYear().toString(),
};

/** @type MainLayout */
const MainLayout = input => {
  const editLinks = [
    {
      linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/layouts/main.mustache`,
      linkText: 'Edit layout',
    },
    ...(input.editLinks || []),
  ];

  return renderMustache(mainLayoutTemplate, {
    ...input,
    commonData,
    editLinks
  });
};

/**
 * @template Data
 * @typedef BuilderInput
 * @property {typeof molino.buildPage} buildPage
 * @property {MainLayout} MainLayout
 * @property {RenderMustache} renderMustache
 * @property {typeof md} md
 */

/**
 * @template Data
 * @callback Builder
 * @param {BuilderInput<Data>} input
 * @returns {Promise<molino.BuildPageOutput>}
 */

/** @type Builder<any>[] */
const builders = [homeBuilder];

/**
 * @returns {Promise<molino.BuildPageOutput>[]}
 */
const siteBuilder = () => {
  /** @param {Builder<any>} pageBuilder */
  const buildPageMapper = pageBuilder =>
    pageBuilder({
      buildPage: molino.buildPage,
      MainLayout,
      renderMustache,
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
