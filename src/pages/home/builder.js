const path = require('path');
const Mustache = require('mustache');
const blogData = require('../blog/data');
const posts = require('../blog/posts-collection/data');
const projects = require('../projects/projects-collection/data');
const postsList = require('../../components/posts-list/api');

/** @typedef {import('../../../scripts/build-pages').MainLayout} MainLayout */

/**
 * @typedef HomePage
 * @property {boolean} hasProjects
 * @property {projects.Project[]} projects
 * @property {boolean} hasPosts
 * @property {blogData.BlogData} blogData
 * @property {any} component
 */

/** @type import('../../../scripts/build-pages').Builder<MainLayout, HomePage> */
const homeBuilder = async ({buildPage, loadComponent}) => {
  const postsListPartial = await loadComponent(
    path.join('src', 'components', 'posts-list', 'index.mustache')
  );

  /** @type import('../../../scripts/build-pages').PageData<HomePage> */
  const pageData = ({commonData}) => ({
    // const pageData = ({molino}) => ({
    hasProjects: projects.length > 0,
    projects: projects,
    hasPosts: posts.length > 0,
    blogData,
    component: {
      postsList: postsList({
        posts: posts.map(post => ({
          link: `${commonData.siteUrl}/${
            blogData.path
          }/${post.outputPath.replace(/index.html$/, '')}`,
          // link: `${molino.baseHref}${blogData.path}/${post.outputPath}`,
          title: post.title,
        })),
      }),
    },
  });

  return buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: 'index.html',
    renderPage: (template, data) =>
      Mustache.render(template, data, {postsList: postsListPartial}),
    layoutData: () => ({
      title: 'Homepage - javiercejudo.com',
      description: 'Javier Cejudo’s personal website',
      pageIsHome: true,
      styles: ['home/index.css'],
    }),
    pageData,
  });
};

module.exports = homeBuilder;
