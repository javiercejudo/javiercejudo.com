const path = require('path');
const blogData = require('../blog/data');
const posts = require('../blog/posts-collection/data');
const projects = require('../projects/projects-collection/data');
const makePostsListComponent = require('../../components/posts-list');

/** @typedef {import('../../../scripts/build-pages').MainLayout} MainLayout */

/**
 * @typedef HomePage
 * @property {boolean} hasProjects
 * @property {projects.Project[]} projects
 * @property {boolean} hasPosts
 * @property {blogData.BlogData} blogData
 * @property {string} postsList
 */

/** @typedef {import('../../../scripts/build-pages').Builder<MainLayout, HomePage>} HomeBuilder */

/** @type HomeBuilder */
const homeBuilder = async ({buildPage}) => {
  const postsListComponent = await makePostsListComponent();

  /** @type import('../../../scripts/build-pages').PageData<HomePage> */
  // const pageData = ({commonData}) => ({
  const pageData = ({molino}) => {
    const postsList = postsListComponent({
      posts: posts.map(post => ({
        // link: `${commonData.siteUrl}/${
        //   blogData.path
        // }/${post.outputPath.replace(/index.html$/, '')}`,
        link: `${molino.baseHref}${blogData.path}/${post.outputPath}`,
        title: post.title,
      })),
    });

    return {
      hasProjects: projects.length > 0,
      projects: projects,
      hasPosts: posts.length > 0,
      blogData,
      postsList,
    };
  };

  return buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: 'index.html',
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
