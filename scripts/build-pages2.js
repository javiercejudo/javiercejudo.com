#!/usr/bin/env node

const path = require('path');
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
 * @typedef {Omit<
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
 * }} MainLayoutProps
 */

/**
 * @param {MainLayoutProps} input
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
 * @callback PageFn
 * @param {molino.MolinoHelpers} input
 * @returns {Omit<MainLayoutProps, keyof molino.MolinoHelpers>}
 */

/**
 * @callback BuildPage
 * @param {{page: PageFn, path: string}} input
 * @returns {Promise<molino.BuildPageOutput>}
 */

/**
 * @typedef BuilderInput
 * @property {BuildPage} buildPage
 * @property {CustomHelpers} customHelpers
 * @property {typeof mainLayout} mainLayout
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
            page: async molinoHelpers =>
              mainLayout({...molinoHelpers, ...(await page(molinoHelpers))}),
            output: {publicPath, relativePath},
          });
        } catch (/** @type any */ e) {
          if (process.env.NODE_ENV !== 'development') {
            console.log(e);
            throw e;
          }

          return Promise.resolve({
            html: `<div style="display: flex; align-items: center; justify-content:center; height: 50%">
              <pre style="white-space: pre-wrap; word-break: break-all;">${
                e.stack || e
              }</pre>
            </div>`,
            path: path.join(publicPath, relativePath),
          });
        }
      },
      customHelpers,
      mainLayout,
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
