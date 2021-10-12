const path = require('path');

/** @type {import('../../../scripts/build-pages2').Builder} */
const contactBuilder = async ({buildPage, mainLayout, html, publicPath}) => {
  /** @type {import('../../../lib/molino2').PageRenderFn} */
  const page = async molinoHelpers => {
    const content = html`
      <div class="container">
        <p><a href="mailto:javier@javiercejudo.com">Send me an email</a></p>
      </div>
    `;

    return mainLayout({
      ...molinoHelpers,
      title: 'Contact me - javiercejudo.com',
      description: 'Get in touch',
      editLinks: [
        {
          linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/contact/builder.js`,
          linkText: 'Edit page',
        },
      ],
      content,
    });
  };

  return buildPage({
    page,
    output: {
      publicPath,
      relativePath: path.join('contact', 'index.html'),
    },
  });
};

module.exports = contactBuilder;
