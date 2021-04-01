const path = require('path');
const Mustache = require('mustache');
const blogData = require('./data');

/** @typedef {import('../../../scripts/build-pages').MainLayout} MainLayout */

/**
 * @typedef BlogHomePage
 * @property {boolean} hasPosts
 * @property {any} component
 */

/** @type import('../../../scripts/build-pages').Builder<MainLayout, BlogHomePage> */
const blogHomeBuilder = async ({buildPage, loadComponent}) => {
  const postsList = await loadComponent(
    path.join('src', 'components', 'posts-list', 'index.mustache')
  );

  return buildPage({
    pageSourcePath: path.join(__dirname, 'index.mustache'),
    relativeOutputPath: path.join(blogData.path, 'index.html'),
    renderPage: (...args) => Mustache.render(...args, {postsList}),
    layoutData: () => ({
      title: 'Blog - javiercejudo.com',
      description: 'Javier Cejudo’s blog',
      styles: ['blog/index.css'],
    }),
    pageData: ({molino}) => ({
      hasPosts: blogData.posts.length > 0,
      component: {
        postsList: {
          posts: blogData.posts.map(post => ({
            link: `${molino.baseHref}${blogData.path}/${post.outputPath}`,
            title: post.title,
          })),
        },
      },
    }),
  });
};

module.exports = blogHomeBuilder;
