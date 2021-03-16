const path = require('path');
const fs = require('fs');
const util = require('util');
const siteData = require('../../siteData');
const blogData = require('./data');

const readFile = util.promisify(fs.readFile);

const homeBuilder = async ({buildPage, md}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'feed.mustache'),
    relativeOutputPath: path.join(blogData.path, 'feed.xml'),
    layoutPath: path.join('src', 'layouts', 'identity.mustache'),
    pageData: {
      blog: blogData,
      updated: new Date().toISOString(),
      renderedPosts: await Promise.all(
        blogData.posts.map(async post => {
          const markdownBuffer = await readFile(
            path.join(
              __dirname,
              'posts-collection',
              ...post.sourcePath.split('/')
            )
          );

          const content = md.render(markdownBuffer.toString());

          return {
            ...post,
            content,
          };
        })
      ),
    },
  });

module.exports = homeBuilder;
