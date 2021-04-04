const fs = require('fs/promises');
const path = require('path');
const Mustache = require('mustache');
const hljs = require('highlight.js');
const makeMd = require('markdown-it');
const blogData = require('../data');
const posts = require('./data');

const siteUrl = process.env.URL;

if (!siteUrl) {
  throw Error('Missing URL environment variable');
}

/** @type {ReturnType<typeof makeMd>} */
const md = makeMd({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
        );
      } catch (__) {}
    }

    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    );
  },
});

/**
 * @typedef HandlerProps
 * @property {string} templatesPath
 */

/**
 * @param {HandlerProps} props
 * @returns {import('express').RequestHandler}
 */
const postHandler = ({templatesPath}) => async (req, res) => {
  try {
    const postSlug = req.params.slug;
    console.log('generating blog post', postSlug);
    const post = posts.find(post => post.dataPath.endsWith(`/${postSlug}`));

    if (post === undefined) {
      res.sendStatus(404);
      return;
    }

    const markdownBuffer = await fs.readFile(
      path.join(__dirname, ...post.sourcePath.split('/'))
    );

    const content = md.render(markdownBuffer.toString());

    const template = await fs.readFile(
      path.join(templatesPath, blogData.path, 'post', 'index.html')
    );

    /** @type import('./builder2').BlogPostPage */
    const view = {
      blogHref: `${siteUrl}/${blogData.path}/index.html`,
      blogData,
      post,
      content: content,
      hasPrev: post.prev !== undefined,
      prevLink:
        post.prev === undefined
          ? undefined
          : `${siteUrl}/${blogData.path}/${post.prev.outputPath}`,
      hasNext: post.next !== undefined,
      nextLink:
        post.next === undefined
          ? undefined
          : `${siteUrl}/${blogData.path}/${post.next.outputPath}`,
    };

    res.send(Mustache.render(template.toString(), view));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = postHandler;
