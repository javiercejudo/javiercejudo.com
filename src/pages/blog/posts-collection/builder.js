const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

/**
 * @typedef PostBuilderProps
 * @property {string} blogPath
 * @property {any} post
 */

/**
 * @param {PostBuilderProps} props
 */
const postBuilder = ({blogPath, post}) => {
  /** @type import('../../builders').Builder */
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
      layoutData: (content, {molino, commonData}) => ({
        content,
        molino,
        commonData,
        title: `${post.title} - example.com`,
        description: post.description,
        styles,
      }),
      pageData: ({molino}) => ({
        molino,
        post,
        blogPath,
        content,
      }),
    });
  };

  return builder
}

module.exports = postBuilder;
