const fs = require('fs/promises');
const path = require('path');

/**
 * @typedef PostBuilderProps
 * @property {import('../data').BlogData} blogData
 * @property {import('./data').Post} post
 */

/** @typedef {import('../../../../scripts/build-pages').MainLayout} MainLayout */

/**
 * @typedef BlogPostPage
 * @property {string} blogHref
 * @property {import('../data').BlogData} blogData
 * @property {import('./data').Post} post
 * @property {string} content
 * @property {string} [prevLink]
 * @property {string} [nextLink]
 * @property {boolean} hasPrev
 * @property {boolean} hasNext
 */

/**
 * @param {PostBuilderProps} props
 */
const postBuilder = ({blogData, post}) => {
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
      relativeOutputPath: path.join(
        blogData.path,
        ...post.outputPath.split('/')
      ),
      layoutData: (_, {editLinks}) => ({
        title: `${post.title} - javiercejudo.com`,
        description: post.description,
        styles,
        editLinks: editLinks.concat([
          {
            linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/blog/posts-collection/${post.dataPath}/index.md`,
            linkText: 'Edit post content',
          },
          {
            linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/blog/posts-collection/${post.dataPath}/index.js`,
            linkText: 'Edit post metadata',
          },
        ]),
      }),
      pageData: ({molino}) => ({
        post,
        blogHref: `${molino.baseHref}${blogData.path}/index.html`,
        blogData,
        content,
        hasPrev: post.prev !== undefined,
        prevLink:
          post.prev === undefined
            ? undefined
            : `${molino.baseHref}${blogData.path}/${post.prev.outputPath}`,
        hasNext: post.next !== undefined,
        nextLink:
          post.next === undefined
            ? undefined
            : `${molino.baseHref}${blogData.path}/${post.next.outputPath}`,
      }),
    });
  };

  return builder;
};

module.exports = postBuilder;
