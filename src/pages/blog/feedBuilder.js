const path = require('path');
const fs = require('fs/promises');
const blogData = require('./data');
const posts = require('./posts-collection/data');

/** @typedef {import('../../../scripts/build-pages').MainLayout} MainLayout */

/**
 * @typedef Feed
 * @property {blogData.BlogData} blog
 */

const MAX_FEED_LENGTH = 10;

/** @type import('../../../scripts/build-pages').Builder<MainLayout, Feed> */
const homeBuilder = async ({buildPage, md}) => {
  const renderedPosts = await Promise.all(
    posts.slice(0, MAX_FEED_LENGTH).map(async post => {
      const markdownBuffer = await fs.readFile(
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
    relativeLayoutSourcePath: 'identity.mustache',
    pageData: () => ({
      blog: blogData,
      updated: new Date().toISOString(),
      renderedPosts,
    }),
  });
};

module.exports = homeBuilder;
