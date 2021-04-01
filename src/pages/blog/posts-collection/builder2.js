const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

/**
 * @typedef PostBuilderProps
 * @property {string} blogPath
 */

/** @typedef {import('../../../../scripts/build-pages').MainLayout} MainLayout */

/**
 * @typedef BlogPostPage
 * @property {string} blogPath
 * @property {import('./data').Post} post
 * @property {string} content
 */

/**
 * @param {PostBuilderProps} props
 */
const postBuilder = ({blogPath}) => {
  /** @type import('../../../../scripts/build-pages').Builder<MainLayout, BlogPostPage> */
  const builder = async ({buildPage, identityRender}) => {
    return buildPage({
      pageSourcePath: path.join(__dirname, 'template.mustache'),
      relativeOutputPath: path.join(blogPath, '_post.html'),
      layoutData: () => ({
        content: '{{{content}}}',
        molino: {
          baseHref: '../',
          isProd: true,
          isDev: false,
        },
        commonData: {
          lang: '{{commonData.lang}}',
          currentYear: '{{commonData.currentYear}}',
          siteUrl: process.env.URL || '',
        },
        title: '{{title}}',
        description: '{{description}}',
      }),
      renderPage: identityRender,
    });
  };

  return builder;
};

module.exports = postBuilder;
