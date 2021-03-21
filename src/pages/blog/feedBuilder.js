const path = require('path');
const fs = require('fs');
const util = require('util');
const blogData = require('./data');

const readFile = util.promisify(fs.readFile);
const MAX_FEED_LENGTH = 10;

const homeBuilder = async ({buildPage, md}) => {
  const renderedPosts = await Promise.all(
    blogData.posts.slice(0, MAX_FEED_LENGTH).map(async post => {
      const markdownBuffer = await readFile(
        path.join(__dirname, 'posts-collection', ...post.sourcePath.split('/'))
      );

      const content = md.render(markdownBuffer.toString());

      return {
        ...post,
        content,
      };
    })
  );

  return buildPage({
    pageSourcePath: path.join(__dirname, 'feed.mustache'),
    relativeOutputPath: path.join(blogData.path, 'feed.xml'),
    layoutPath: path.join('src', 'layouts', 'identity.mustache'),
    pageData: ({molino, commonData}) => ({
      molino,
      commonData,
      blog: blogData,
      updated: new Date().toISOString(),
      renderedPosts,
    }),
  });
};

module.exports = homeBuilder;
