const path = require('path');
const Mustache = require('mustache');
const postsList = require('../../components/posts-list/api');
const blogData = require('./data');

/** @typedef {import('../../../scripts/build-pages').MainLayout} MainLayout */

/**
 * @typedef BlogHomePage
 * @property {boolean} hasPosts
 * @property {string} title
 * @property {string} authorName
 * @property {any} component
 */

/** @type import('../../../scripts/build-pages').Builder<MainLayout, BlogHomePage> */
const blogHomeBuilder = async ({buildPage, loadComponent}) => {
  const postsListPartial = await loadComponent(
    path.join('src', 'components', 'posts-list', 'index.mustache')
  );

  return buildPage({
    pageSourcePath: path.join(__dirname, 'index.mustache'),
    relativeOutputPath: path.join(blogData.path, 'index.html'),
    renderPage: (...args) => Mustache.render(...args, {postsList: postsListPartial}),
    layoutData: () => ({
      title: `${blogData.title} - javiercejudo.com`,
      description: 'Javier Cejudo’s blog',
      styles: ['blog/index.css'],
      editLinks: [
        {
          linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/blog/data.js`,
          linkText: 'Edit data',
        },
        {
          linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/blog/homeBuilder.js`,
          linkText: 'Edit builder',
        }
      ],
    }),
    pageData: ({molino}) => ({
      hasPosts: blogData.posts.length > 0,
      title: blogData.title,
      authorName: blogData.authorName,
      component: {
        postsList: postsList({
          posts: blogData.posts.map(post => ({
            // link: `${commonData.siteUrl}/${blogData.path}/${post.outputPath}`,
            link: `${molino.baseHref}${blogData.path}/${post.outputPath}`,
            title: post.title,
          })),
        }),
      },
    }),
  });
};

module.exports = blogHomeBuilder;
