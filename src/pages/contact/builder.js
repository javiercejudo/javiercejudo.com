const path = require('path');

/** @type {import('../../../scripts/build-pages2').Builder} */
const contactBuilder = async ({buildPage, html}) => {
  /** @type {import('../../../scripts/build-pages2').PageFn} */
  const page = async () => ({
    title: 'Contact me - javiercejudo.com',
    description: 'Get in touch',
    editLinks: [
      {
        linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/contact/builder.js`,
        linkText: 'Edit page',
      },
    ],
    content: html`
      <div class="container">
        <p><a href="mailto:javier@javiercejudo.com">Send me an email</a></p>
      </div>
    `,
  });

  return buildPage({
    page,
    path: path.join('contact', 'index.html'),
  });
};

module.exports = contactBuilder;
