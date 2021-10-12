#!/usr/bin/env node

const path = require('path');
const Mustache = require('mustache');
const {html} = require('common-tags');
const molino = require('../lib/molino2');
const homeBuilder = require('../src/pages/home/builder');
const contactBuilder = require('../src/pages/contact/builder');
const md = require('../src/utils/md');
const {
  mainLayout: mainLayoutImpl,
  baseHref,
  deferredScript,
  moduleScript,
  styleTag,
  editLinksPartial,
  editLink,
  navLink,
} = require('../src/layouts/main');

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
 * @param {Omit<
 *   Parameters<import('../src/layouts/main').MainLayout>[0],
 *   | keyof CustomHelpers
 *   | 'pagePath'
 *   | 'baseHrefTag'
 *   | 'commonScriptTag'
 *   | 'styleTags'
 *   | 'scriptTags'
 *   | 'editLinksPartial'
 *   | 'homeNavLink'
 *   | 'menuNavLink'
 * > & {
 *   relativePath: string,
 *   styles?: string[],
 *   scripts?: string[],
 *   editLinks?: import('../src/layouts/main').EditLink[],
 *   isProd: boolean,
 * }} input
 */
const mainLayout = ({scripts = [], styles = [], editLinks = [], ...input}) => {
  const layoutNavLink = navLink(input.baseHref, input.relativePath);

  return mainLayoutImpl({
    ...customHelpers,
    ...input,
    pagePath: `${input.baseHref}${input.relativePath}`,
    baseHrefTag: input.isProd ? baseHref(input.baseHref) : '',
    commonScriptTag: input.isProd
      ? deferredScript(input.baseHref)
      : moduleScript(input.baseHref),
    styleTags: html`${styles.map(style => styleTag(input.baseHref, style))}`,
    scriptTags: html`${scripts.map(script =>
      input.isProd
        ? deferredScript(input.baseHref, script)
        : moduleScript(input.baseHref, script)
    )}`,
    homeNavLink: layoutNavLink('index.html', 'Home'),
    menuNavLink: layoutNavLink('menu/index.html', 'Menu'),
    editLinksPartial: editLinksPartial(
      html`${[
        {
          linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/layouts/main.js`,
          linkText: 'Edit layout',
        },
        ...editLinks,
      ].map(editLink)}`
    ),
  });
};

// Example of rendering the layout with Mustache placeholders for use in other languages
// mainLayoutImpl({
//   baseHref: '{{{baseHref}}}',
//   pagePath: '{{{pagePath}}}',
//   siteUrl: '{{siteUrl}}',
//   currentYear: '{{currentYear}}',
//   title: '{{title}}',
//   description: '{{description}}',
//   content: '{{{content}}}',
//   lang: '{{lang}}',
//   baseHrefTag: '{{{baseHrefTag}}}',
//   commonScriptTag: '{{{commonScriptTag}}}',
//   styleTags: '{{{styleTags}}}',
//   scriptTags: '{{{scriptTags}}}',
//   homeNavLink: '{{{homeNavLink}}}',
//   menuNavLink: '{{{menuNavLink}}}',
//   editLinksPartial: '{{{editLinksPartial}}}',
// }).then(console.log);

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
 * @property {typeof mainLayout} mainLayout
 * @property {RenderMustache} renderMustache
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
      mainLayout,
      renderMustache,
      html,
      md,
      publicPath: path.join('src', 'static'),
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
