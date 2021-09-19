#!/usr/bin/env node

const {html} = require('common-tags');

const siteUrl = process.env.URL;

if (!siteUrl) {
  throw Error('Missing URL environment variable');
}

/**
 * @typedef EditLink
 * @property {string} linkHref
 * @property {string} linkText
 */

/**
 * @typedef MainLayoutData
 * @property {import('../../lib/molino2').TemplateHelpers} molino
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
      linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/layouts/main.js`,
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

module.exports = MainLayout;
