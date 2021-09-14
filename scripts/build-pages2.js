#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Mustache = require('mustache');
// const {html} = require('common-tags')
const molino = require('../lib/molino2');
const homeBuilder = require('../src/pages/home/builder');
const md = require('../src/utils/md');

/**
 * @param {TemplateStringsArray} template
 * @param {...any} args
 */
const html = (template, ...args) => {
  let str = '';
  for (let i = 0; i < args.length; i++) {
    const argString = Array.isArray(args[i])
      ? args[i].map(String).join('')
      : String(args[i]);

    str += template[i] + argString;
  }
  return str + template[template.length - 1];
};

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
const MainLayout = async ({
  molino,
  title,
  description,
  content,
  editLinks = [],
  styles = [],
  scripts = [],
  pageClass = '',
  pagePath = '',
  pageIsHome = false,
  pageIsMenu = false,
}) => {
  const finalEditLinks = [
    {
      linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/scripts/build-pages2.js`,
      linkText: 'Edit layout',
    },
    ...editLinks,
  ];

  return html`
    <!DOCTYPE html>
    <html lang="${commonData.lang}" data-theme="jc-dark">
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>

        <meta name="description" content="${description}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        ${molino.isProd
          ? html`
              <!-- used throughout the template. In prod, all assets and links to files -->
              <!-- are relative to 'baseHref', hence why we need this base tag. -->
              <base href="${molino.baseHref}" />
            `
          : ''}

        <link
          rel="stylesheet"
          type="text/css"
          href="${molino.baseHref}assets/css/common/index.css"
        />

        <script src="${molino.baseHref}assets/js/common/theme.js"></script>

        ${molino.isProd
          ? html`
              <script
                src="${molino.baseHref}assets/js/common/index.js"
                defer
              ></script>
            `
          : html`
              <script
                type="module"
                src="${molino.baseHref}assets/js/common/index.js"
              ></script>
            `}

        <!-- Resources that are likely to be needed soon  -->
        <link
          rel="prefetch"
          href="${molino.baseHref}assets/css/highlight-js/index.css"
          as="style"
        />

        <link
          type="application/atom+xml"
          rel="alternate"
          href="${commonData.siteUrl}/blog/feed.xml"
          title="Tech notes by Javier Cejudo"
        />

        ${styles.map(
          style => html`
            <link
              rel="stylesheet"
              type="text/css"
              href="${molino.baseHref}assets/css/${style}"
            />
          `
        )}
        ${scripts.map(
          script => html`
            ${molino.isProd
              ? html`
                  <script
                    src="${molino.baseHref}assets/js/${script}"
                    defer
                  ></script>
                `
              : html`
                  <script
                    type="module"
                    src="${molino.baseHref}assets/js/${script}"
                  ></script>
                `}
          `
        )}
      </head>

      <body class="${pageClass}">
        <a href="${pagePath}#skip-nav" class="skip-nav">Skip to content</a>

        <div class="page">
          <header>
            <div class="container">
              <nav>
                <ul>
                  <li>
                    <a
                      href="${molino.baseHref}index.html"
                      class="nav-home ${pageIsHome ? 'is-active' : ''}"
                    >
                      Home
                    </a>
                  </li>
                </ul>
                <a
                  class="logo-link"
                  href="${molino.baseHref}index.html"
                  title="Home"
                >
                  <div class="logo">
                    <span class="logo-j"></span>
                    <span class="logo-j2"></span>
                    <span class="logo-c"></span>
                  </div>
                </a>
                <ul>
                  <li>
                    <a
                      href="${molino.baseHref}menu/index.html"
                      class="nav-menu ${pageIsMenu ? 'is-active' : ''}"
                    >
                      Menu
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>

          <div class="content" id="skip-nav">${content}</div>

          <footer>
            <p>
              ${finalEditLinks.map(
                editLink => html`
                  <span class="edit-link"
                    ><a href="${editLink.linkHref}" rel="noreferrer noopener"
                      >${editLink.linkText}</a
                    ></span
                  >
                `
              )}
            </p>
            <div class="jc-theme-switcher jc-theme-switcher-cloak">
              <button>Switch theme</button>
            </div>
            <p>© javiercejudo.com 2013-${commonData.currentYear}</p>
          </footer>
        </div>
      </body>
    </html>
  `;
};

/**
 * @typedef BuilderInput
 * @property {typeof molino.buildPage} buildPage
 * @property {MainLayout} MainLayout
 * @property {RenderMustache} renderMustache
 * @property {typeof md} md
 * @property {typeof html} html
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
          return molino.buildPage(...args)
        }

        try {
          return await molino.buildPage(...args);
        } catch (/** @type any */ e) {
          return Promise.resolve({
            html: html`<pre>${e.stack || e}</pre>`,
            path: path.join(args[0].output.publicPath, args[0].output.relativePath)
          });
        }
      },
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
