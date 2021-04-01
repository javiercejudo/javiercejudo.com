const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

/**
 * @typedef PostBuilderProps
 * @property {string} blogPath
 * @property {import('./data').Post} post
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
const postBuilder = ({blogPath, post}) => {
  /** @type import('../../../../scripts/build-pages').Builder<MainLayout, BlogPostPage> */
  const builder = async ({buildPage, md}) => {
    const markdownBuffer = await readFile(
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
      }),
      pageData: () => ({
        post,
        blogPath,
        content,
      }),
    });
  };

  return builder;
};

module.exports = postBuilder;
