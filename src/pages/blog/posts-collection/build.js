const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);

const buildPosts = ({blogPath, postData}) => async ({buildPage, md}) => {
  const markdownBuffer = await readFile(
    path.join(__dirname, ...postData.sourcePath.split('/'))
  );

  const content = md.render(markdownBuffer.toString());
  const styles = [];

  if (postData.withHighlightJs !== false) {
    styles.push('highlight-js/index.css');
  }

  return buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join(blogPath, ...postData.outputPath.split('/')),
    layoutData: {
      title: `${postData.title} - example.com`,
      description: postData.description,
      styles,
    },
    pageData: {
      ...postData,
      blogPath,
      content,
    },
  });
};
module.exports = buildPosts;
