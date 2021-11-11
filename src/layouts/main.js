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
 * @param {string} baseHref
 * @param {string} style
 */
const genStyleTag = (baseHref, style) =>
  html`
    <link
      rel="stylesheet"
      type="text/css"
      href="${baseHref}assets-gen/css/${style}"
    />
  `;

exports.genStyleTag = genStyleTag;
/**
 * @param {string} baseHref
 * @param {string} relativePath
 */
const navLink = (baseHref, relativePath) => {
  const pagePath = `${baseHref}${relativePath}`;

  /**
   * @param {string} linkPath
   * @param {string} linkText
   */
  return (linkPath, linkText) => {
    const linkHref = `${baseHref}${linkPath}`;

    return html`<a
      href="${linkHref}"
      class="nav-home ${pagePath === linkHref ? 'is-active' : ''}"
      >${linkText}</a
    >`;
  };
};

exports.navLink = navLink;

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

exports.editLink = editLink;

/**
 * @param {string} editLinks
 */
const editLinksPartial = editLinks => html` <p>${editLinks}</p> `;
exports.editLinksPartial = editLinksPartial;

/**
 * @typedef MainLayoutData
 * @property {string} lang
 * @property {string} baseHref
 * @property {string} baseHrefTag
 * @property {string} styleTags
 * @property {string} genStyleTags
 * @property {string} scriptTags
 * @property {string} commonScriptTag
 * @property {string} siteUrl
 * @property {string} currentYear
 * @property {string} title
 * @property {string} description
 * @property {string} content
 * @property {string} editLinksPartial
 * @property {string} pagePath
 * @property {string} homeNavLink
 * @property {string} menuNavLink
 * @property {string} [pageClass]
 */

/**
 * @callback MainLayout
 * @param {MainLayoutData} input
 * @returns {Promise<string>}
 */

/** @type MainLayout */
const mainLayoutBase = async ({
  lang,
  baseHref,
  baseHrefTag,
  commonScriptTag,
  styleTags,
  genStyleTags,
  scriptTags,
  siteUrl,
  currentYear,
  title,
  description,
  content,
  editLinksPartial,
  pagePath,
  homeNavLink,
  menuNavLink,
  pageClass = 'standard-page',
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

      ${styleTags} ${genStyleTags} ${scriptTags}
    </head>

    <body class="${pageClass}">
      <a href="${pagePath}#skip-nav" class="skip-nav">Skip to content</a>

      <div class="page">
        <header>
          <div class="container">
            <nav>
              <ul>
                <li>${homeNavLink}</li>
              </ul>

              <a class="logo-link" href="${baseHref}index.html" title="Home">
                <div class="logo">
                  <span class="logo-j"></span>
                  <span class="logo-j2"></span>
                  <span class="logo-c"></span>
                </div>
              </a>

              <ul>
                <li>${menuNavLink}</li>
                <!-- <li>Page path: "${pagePath}"</li> -->
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

exports.mainLayoutBase = mainLayoutBase;

// Example of rendering the layout with Mustache placeholders for use in other languages
// mainLayoutBase({
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
 * @typedef {Omit<
 *   Parameters<MainLayout>[0],
 *   | 'pagePath'
 *   | 'baseHrefTag'
 *   | 'commonScriptTag'
 *   | 'styleTags'
 *   | 'genStyleTags'
 *   | 'scriptTags'
 *   | 'editLinksPartial'
 *   | 'homeNavLink'
 *   | 'menuNavLink'
 * > & {
 *   relativePath: string,
 *   styles?: string[],
 *   genStyles?: string[],
 *   scripts?: string[],
 *   editLinks?: EditLink[],
 *   isProd: boolean,
 * }} MainLayoutProps
 */

/**
 * @param {MainLayoutProps} input
 */
const mainLayout = ({
  scripts = [],
  styles = [],
  genStyles = [],
  editLinks = [],
  ...input
}) => {
  const layoutNavLink = navLink(input.baseHref, input.relativePath);

  return mainLayoutBase({
    ...input,
    pagePath: `${input.baseHref}${input.relativePath}`,
    baseHrefTag: input.isProd ? baseHref(input.baseHref) : '',
    commonScriptTag: input.isProd
      ? deferredScript(input.baseHref)
      : moduleScript(input.baseHref),
    styleTags: html`${styles.map(style => styleTag(input.baseHref, style))}`,
    genStyleTags: html`${genStyles.map(genStyle =>
      genStyleTag(input.baseHref, genStyle)
    )}`,
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

exports.mainLayout = mainLayout;
