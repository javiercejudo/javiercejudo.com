const path = require('path');
const {css, cache} = require('@emotion/css');
const createEmotionServer = require('@emotion/server/create-instance').default;
const blogData = require('../blog/data');
const clockData = require('../clock/data');

const {extractCritical} = createEmotionServer(cache);
const styles = css`
  ul {
    margin: calc(32rem / 16) 0;
    padding: 0;
    list-style: none;
    text-align: center;
  }

  li {
    margin-bottom: calc(16rem / 16);

    &:last-child {
      margin-bottom: 0;
    }

    a {
      text-decoration: none;
    }
  }
`;

/** @type {import('../../../scripts/build-pages2').Builder} */
const menuBuilder = ({buildPage, withMainLayout, html}) => {
  const page = withMainLayout(async molinoHelpers => {
    const content = html`
      <div class="container ${styles}">
        <ul>
          <li>
            <a href="${molinoHelpers.baseHref}projects/index.html">Projects</a>
          </li>
          <li>
            <a href="${molinoHelpers.baseHref}${blogData.path}/index.html"
              >Blog</a
            >
          </li>
          <li>
            <a href="${molinoHelpers.baseHref}about-me/index.html">About me</a>
            /
            <a href="${molinoHelpers.baseHref}sobre-mi/index.html">Sobre mí</a>
          </li>
          <li>
            <a href="${molinoHelpers.baseHref}contact/index.html">Contact</a>
          </li>
          <li>
            <a href="${molinoHelpers.baseHref}game/index.html" data-prerender
              >Game</a
            >
          </li>
          <li>
            <a href="${molinoHelpers.baseHref}${clockData.path}" data-noprefetch
              >Clock</a
            >
          </li>
        </ul>
      </div>
    `;

    const {css} = extractCritical(content);

    return {
      title: 'Menu - javiercejudo.com',
      description: 'Find your way around my site',
      editLinks: [
        {
          linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/menu/builder.js`,
          linkText: 'Edit page',
        },
      ],
      rawHead: html`<style>
        ${css}
      </style>`,
      content,
    };
  });

  return buildPage({
    page,
    path: path.join('menu', 'index.html'),
  });
};

module.exports = menuBuilder;
