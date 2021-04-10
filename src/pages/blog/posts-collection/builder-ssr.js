const fs = require('fs');
const path = require('path');
const util = require('util');
const molino = require('../../../../lib/molino');

const readFile = util.promisify(fs.readFile);

/**
 * @typedef PostBuilderProps
 * @property {string} blogPath
 */

/** @typedef {import('../../../../scripts/build-pages').MainLayout} MainLayout */

/**
 * @typedef {import('./builder').BlogPostPage} BlogPostPage
 */

/**
 * @param {PostBuilderProps} props
 */
const postBuilder = ({blogPath}) => {
  /** @type import('../../../../scripts/build-pages').Builder<MainLayout, BlogPostPage> */
  const builder = async ({buildPage, identityRender}) => {
    return buildPage({
      pageSourcePath: path.join(__dirname, 'template.mustache'),
      relativeOutputPath: path.join(blogPath, 'post', 'index.html'),
      layoutData: (_, {molino, commonData, editLinks}) => ({
        // content: '{{{content}}}',
        molino: {
          ...molino,
          relativeOutputPath: `{{{molino.relativeOutputPath}}}`,
        },
        commonData: {
          ...commonData,
          lang: '{{commonData.lang}}',
        },
        pagePath: '{{{pagePath}}}',
        title: '{{title}}',
        description: '{{description}}',
        styles: ['highlight-js/index.css'],
        editLinks: editLinks.concat([
          {
            linkHref:
              'https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/blog/posts-collection/{{{post.dataPath}}}/index.md',
            linkText: 'Edit post content',
          },
          {
            linkHref:
              'https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/blog/posts-collection/{{{post.dataPath}}}/index.js',
            linkText: 'Edit post metadata',
          },
        ]),
      }),
      renderPage: identityRender,
    });
  };

  return builder;
};

module.exports = postBuilder;
