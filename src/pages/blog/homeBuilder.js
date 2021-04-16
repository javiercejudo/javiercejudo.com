const path = require('path');
const makePostsListComponent = require('../../components/posts-list');
const blogData = require('./data');
const posts = require('./posts-collection/data');

/** @typedef {import('../../../scripts/build-pages').MainLayout} MainLayout */

/**
 * @typedef BlogHomePage
 * @property {boolean} hasPosts
 * @property {string} title
 * @property {string} authorName
 * @property {string} postsList
 */

/** @type import('../../../scripts/build-pages').Builder<MainLayout, BlogHomePage> */
const blogHomeBuilder = async ({buildPage}) => {
  const postsListComponent = await makePostsListComponent();

  return buildPage({
    pageSourcePath: path.join(__dirname, 'index.mustache'),
    relativeOutputPath: path.join(blogData.path, 'index.html'),
    layoutData: (_, {editLinks}) => ({
      title: `${blogData.title} - javiercejudo.com`,
      description: 'Javier Cejudo’s blog',
      styles: ['blog/index.css'],
      editLinks: editLinks.concat([
        {
          linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/blog/data.js`,
          linkText: 'Edit data',
        },
      ]),
    }),
    // pageData: ({commonData}) => ({
    pageData: ({molino}) => ({
      hasPosts: posts.length > 0,
      title: blogData.title,
      authorName: blogData.authorName,
      postsList: postsListComponent({
        posts: posts.map(post => ({
          // link: `${commonData.siteUrl}/${
          //   blogData.path
          // }/${post.outputPath.replace(/index.html$/, '')}`,
          link: `${molino.baseHref}${blogData.path}/${post.outputPath}`,
          title: post.title,
        })),
      }),
    }),
  });
};

module.exports = blogHomeBuilder;
