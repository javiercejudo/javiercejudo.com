const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const postBuilder = ({blogPath, post}) => async ({buildPage, md}) => {
  const markdownBuffer = await readFile(
    path.join(__dirname, ...post.sourcePath.split('/'))
  );

  const content = md.render(markdownBuffer.toString());
  const styles = [];

  if (post.withHighlightJs !== false) {
    styles.push('highlight-js/index.css');
  }

  return buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join(blogPath, ...post.outputPath.split('/')),
    layoutData: {
      title: `${post.title} - example.com`,
      description: post.description,
      styles,
    },
    pageData: {
      post,
      blogPath,
      content,
    },
  });
};

module.exports = postBuilder;
