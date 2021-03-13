const fs = require('fs');
const path = require('path');

const buildPosts = ({blogPath, postData}) => ({buildPage, md}) =>
  new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, ...postData.sourcePath.split('/')),
      (err, markdownBuffer) => {
        if (err) {
          return reject(err);
        }

        const content = md.render(markdownBuffer.toString());
        const styles = [];

        if (postData.withHighlightJs !== false) {
          styles.push('highlight-js/index.css');
        }

        const page = buildPage({
          pageSourcePath: path.join(__dirname, 'template.mustache'),
          relativeOutputPath: path.join(
            blogPath,
            ...postData.outputPath.split('/')
          ),
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

        resolve(page);
      }
    );
  });
module.exports = buildPosts;