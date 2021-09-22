#!/usr/bin/env node

const {html} = require('common-tags');

/**
 * @typedef EditLink
 * @property {string} linkHref
 * @property {string} linkText
 */

/**
 * @typedef MainLayoutData
 * @property {string} lang
 * @property {string} baseHref
 * @property {boolean} isProd
 * @property {string} siteUrl
 * @property {number} currentYear
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

/** @type MainLayout */
const MainLayout = async ({
  lang,
  baseHref,
  isProd,
  siteUrl,
  currentYear,
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
    <html lang="${lang}" data-theme="jc-dark">
      <head>
        <meta charset="utf-8" />
        <title>${title}</title>

        <meta name="description" content="${description}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        ${isProd
          ? html`
              <!-- used throughout the template. In prod, all assets and links to files -->
              <!-- are relative to 'baseHref', hence why we need this base tag. -->
              <base href="${baseHref}" />
            `
          : ''}

        <link
          rel="stylesheet"
          type="text/css"
          href="${baseHref}assets/css/common/index.css"
        />

        <script src="${baseHref}assets/js/common/theme.js"></script>

        ${isProd
          ? html`
              <script src="${baseHref}assets/js/common/index.js" defer></script>
            `
          : html`
              <script
                type="module"
                src="${baseHref}assets/js/common/index.js"
              ></script>
            `}

        <!-- Resources that are likely to be needed soon  -->
        <link
          rel="prefetch"
          href="${baseHref}assets/css/highlight-js/index.css"
          as="style"
        />

        <link
          type="application/atom+xml"
          rel="alternate"
          href="${siteUrl}/blog/feed.xml"
          title="Tech notes by Javier Cejudo"
        />

        ${styles.map(
          style => html`
            <link
              rel="stylesheet"
              type="text/css"
              href="${baseHref}assets/css/${style}"
            />
          `
        )}
        ${scripts.map(
          script => html`
            ${isProd
              ? html`
                  <script src="${baseHref}assets/js/${script}" defer></script>
                `
              : html`
                  <script
                    type="module"
                    src="${baseHref}assets/js/${script}"
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
                      href="${baseHref}index.html"
                      class="nav-home ${pageIsHome ? 'is-active' : ''}"
                    >
                      Home
                    </a>
                  </li>
                </ul>
                <a class="logo-link" href="${baseHref}index.html" title="Home">
                  <div class="logo">
                    <span class="logo-j"></span>
                    <span class="logo-j2"></span>
                    <span class="logo-c"></span>
                  </div>
                </a>
                <ul>
                  <li>
                    <a
                      href="${baseHref}menu/index.html"
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
            <p>© javiercejudo.com 2013-${currentYear}</p>
          </footer>
        </div>
      </body>
    </html>
  `;
};

module.exports = MainLayout;
