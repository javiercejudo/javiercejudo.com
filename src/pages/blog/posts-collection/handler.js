const fs = require('fs/promises');
const path = require('path');
const Mustache = require('mustache');
const Cache = require('stale-lru-cache');
const md = require('../../../utils/md');
const blogData = require('../data');
const posts = require('./data');

/** @type Cache<string, posts.Post> */
var cache = new Cache({
  maxSize: 100,
  maxAge: 10,
  staleWhileRevalidate: 50,
});

const siteUrl = process.env.URL;

if (!siteUrl) {
  throw Error('Missing URL environment variable');
}

/**
 * @typedef HandlerProps
 * @property {string} templatesPath
 */

/**
 * @param {HandlerProps} props
 * @returns {import('express').RequestHandler}
 */
const makePostHandler = ({templatesPath}) => async (req, res) => {
  const postSlug = req.params.slug;
  console.log('generating blog post', postSlug);
  const post = posts.find(post => post.dataPath.endsWith(`/${postSlug}`));

  if (post === undefined) {
    res.sendStatus(404);
    console.error(`post not found: "${postSlug}"`);
    return;
  }

  res.set({
    'Cache-Control': 'max-age=10, stale-while-revalidate=50',
  });

  try {
    const markdownBuffer = await fs.readFile(
      path.join(__dirname, ...post.sourcePath.split('/'))
    );

    const content = md.render(markdownBuffer.toString());

    const template = await fs.readFile(
      path.join(templatesPath, blogData.path, 'post', 'index.html')
    );

    const relativeOutputPath = path.join(
      blogData.path,
      ...post.outputPath.split('/')
    );

    /** @type import('../../../../scripts/build-pages').MainLayout & import('./builder-ssr').BlogPostPage */
    const view = {
      blogHref: `${siteUrl}/${blogData.path}/index.html`,
      blogData,
      post,
      title: `${post.title} - javiercejudo.com`,
      description: post.description,
      pagePath: `${siteUrl}/${relativeOutputPath}`,
      content,
      hasPrev: post.prev !== undefined,
      prevLink:
        post.prev === undefined
          ? undefined
          : `${siteUrl}/${blogData.path}/${post.prev.outputPath.replace(
              /index.html$/,
              ''
            )}`,
      hasNext: post.next !== undefined,
      nextLink:
        post.next === undefined
          ? undefined
          : `${siteUrl}/${blogData.path}/${post.next.outputPath.replace(
              /index.html$/,
              ''
            )}`,
    };

    res.send(Mustache.render(template.toString(), view));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = makePostHandler;
