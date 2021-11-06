const path = require('path');
const blogData = require('../blog/data');
const clockData = require('../clock/data');

/** @type {import('../../../scripts/build-pages2').Builder} */
const menuBuilder = ({buildPage, withMainLayout, html}) => {
  const page = withMainLayout(async molinoHelpers => ({
    title: 'Menu - javiercejudo.com',
    description: 'Find your way around my site',
    styles: ['menu/index.css'],
    editLinks: [
      {
        linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/menu/builder.js`,
        linkText: 'Edit page',
      },
    ],
    content: html`
      <div class="container">
        <ul class="menu">
          <li class="menu-item">
            <a href="${molinoHelpers.baseHref}projects/index.html">Projects</a>
          </li>
          <li class="menu-item">
            <a href="${molinoHelpers.baseHref}${blogData.path}/index.html"
              >Blog</a
            >
          </li>
          <li class="menu-item">
            <a href="${molinoHelpers.baseHref}about-me/index.html">About me</a>
            /
            <a href="${molinoHelpers.baseHref}sobre-mi/index.html">Sobre mí</a>
          </li>
          <li class="menu-item">
            <a href="${molinoHelpers.baseHref}contact/index.html">Contact</a>
          </li>
          <li class="menu-item">
            <a href="${molinoHelpers.baseHref}game/index.html" data-prerender
              >Game</a
            >
          </li>
          <li class="menu-item">
            <a href="${molinoHelpers.baseHref}${clockData.path}" data-noprefetch
              >Clock</a
            >
          </li>
        </ul>
      </div>
    `,
  }));

  return buildPage({
    page,
    path: path.join('menu', 'index.html'),
  });
};

module.exports = menuBuilder;
