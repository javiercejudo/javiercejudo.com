#!/usr/bin/env node

const {html} = require('common-tags');

/**
 * @param {string} href
 */
const baseHref = href => {
  // Used throughout the template. In prod, all assets and links to files
  // are relative to 'href', hence why we need this base tag.
  return html`<base href="${href}" />`;
};

exports.baseHref = baseHref;

/**
 * @param {string} baseHref
 */
const deferredScript = (baseHref, script = 'common/index.js') =>
  html` <script src="${baseHref}assets/js/${script}" defer></script> `;

exports.deferredScript = deferredScript;

/**
 * @param {string} baseHref
 */
const moduleScript = (baseHref, script = 'common/index.js') =>
  html` <script type="module" src="${baseHref}assets/js/${script}"></script> `;

exports.moduleScript = moduleScript;

/**
 * @param {string} baseHref
 * @param {string} style
 */
const styleTag = (baseHref, style) =>
  html`
    <link
      rel="stylesheet"
      type="text/css"
      href="${baseHref}assets/css/${style}"
    />
  `;

exports.styleTag = styleTag;

/**
 * @typedef EditLink
 * @property {string} linkHref
 * @property {string} linkText
 */

/**
 * @param {EditLink} link
 */
const editLink = link => html`
  <span class="edit-link"
    ><a href="${link.linkHref}" rel="noreferrer noopener"
      >${link.linkText}</a
    ></span
  >
`;

/**
 * @param {EditLink[]} editLinks
 */
const editLinksPartial = editLinks => html` <p>${editLinks.map(editLink)}</p> `;
exports.editLinksPartial = editLinksPartial;

/**
 * @typedef MainLayoutData
 * @property {string} lang
 * @property {string} baseHref
 * @property {string} baseHrefTag
 * @property {string} styleTags
 * @property {string} scriptTags
 * @property {string} commonScriptTag
 * @property {string} siteUrl
 * @property {string} currentYear
 * @property {string} title
 * @property {string} description
 * @property {string} content
 * @property {string} editLinksPartial
 * @property {string} [pagePath]
 * @property {boolean} [pageIsHome]
 * @property {boolean} [pageIsMenu]
 * @property {string} [pageClass]
 * @property {EditLink[]} [editLinks]
 */

/**
 * @callback MainLayout
 * @param {MainLayoutData} input
 * @returns {Promise<string>}
 */

/** @type MainLayout */
const mainLayout = async ({
  lang,
  baseHref,
  baseHrefTag,
  commonScriptTag,
  styleTags,
  scriptTags,
  siteUrl,
  currentYear,
  title,
  description,
  content,
  editLinksPartial,
  pageClass = '',
  pagePath = '',
  pageIsHome = false,
  pageIsMenu = false,
}) => html`
  <!DOCTYPE html>
  <html lang="${lang}" data-theme="jc-dark">
    <head>
      <meta charset="utf-8" />
      <title>${title}</title>

      <meta name="description" content="${description}" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      ${baseHrefTag}

      <link
        rel="stylesheet"
        type="text/css"
        href="${baseHref}assets/css/common/index.css"
      />

      <script src="${baseHref}assets/js/common/theme.js"></script>

      ${commonScriptTag}

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

      ${styleTags} ${scriptTags}
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
          ${editLinksPartial}

          <div class="jc-theme-switcher jc-theme-switcher-cloak">
            <button>Switch theme</button>
          </div>

          <p>© javiercejudo.com 2013-${currentYear}</p>
        </footer>
      </div>
    </body>
  </html>
`;

exports.mainLayout = mainLayout;
