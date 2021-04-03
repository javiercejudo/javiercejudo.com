const fs = require('fs/promises');
const path = require('path');

/**
 * @typedef PostBuilderProps
 * @property {string} blogPath
 * @property {import('./data').Post} post
 */

/** @typedef {import('../../../../scripts/build-pages').MainLayout} MainLayout */

/**
 * @typedef BlogPostPage
 * @property {string} blogHref
 * @property {import('./data').Post} post
 * @property {string} content
 */

/**
 * @param {PostBuilderProps} props
 */
const postBuilder = ({blogPath, post}) => {
  /** @type import('../../../../scripts/build-pages').Builder<MainLayout, BlogPostPage> */
  const builder = async ({buildPage, md}) => {
    const markdownBuffer = await fs.readFile(
      path.join(__dirname, ...post.sourcePath.split('/'))
    );

    const content = md.render(markdownBuffer.toString());

    /** @type string[] */
    const styles = [];

    if (post.withHighlightJs !== false) {
      styles.push('highlight-js/index.css');
    }

    return buildPage({
      pageSourcePath: path.join(__dirname, 'template.mustache'),
      relativeOutputPath: path.join(blogPath, ...post.outputPath.split('/')),
      layoutData: () => ({
        title: `${post.title} - example.com`,
        description: post.description,
        styles,
        editLinks: [
          {
            linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/blog/posts-collection/${post.dataPath}/index.md`,
            linkText: 'Edit post content',
          },
          {
            linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/blog/posts-collection/${post.dataPath}/index.js`,
            linkText: 'Edit post metadata',
          },
        ],
      }),
      pageData: ({molino}) => ({
        post,
        blogHref: `${molino.baseHref}${blogPath}/index.html`,
        content,
      }),
    });
  };

  return builder;
};

module.exports = postBuilder;
