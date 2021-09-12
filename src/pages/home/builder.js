const fs = require('fs');
const path = require('path');
const blogData = require('../blog/data');
const posts = require('../blog/posts-collection/data');
const projects = require('../projects/projects-collection/data');
const makePostsListComponent = require('../../components/posts-list');

/**
 * @typedef HomePageData
 * @property {boolean} hasProjects
 * @property {projects.Project[]} projects
 * @property {boolean} hasPosts
 * @property {blogData.BlogData} blogData
 * @property {string} postsList
 */

/** @type {import('../../../scripts/build-pages2').Builder<HomePageData>} */
const homeBuilder = async ({buildPage, MainLayout, renderMustache}) => {
  const postsListComponent = await makePostsListComponent();

  const template = fs.readFileSync(path.join(__dirname, 'template.mustache'));

  /** @param {HomePageData} props */
  const Page = props => renderMustache(template.toString(), props);

  return buildPage({
    // page: ({commonData}) => {
    page: async (molino) => {
      const postsList = postsListComponent({
        posts: posts.map(post => ({
          // link: `${commonData.siteUrl}/${
          //   blogData.path
          // }/${post.outputPath.replace(/index.html$/, '')}`,
          link: `${molino.baseHref}${blogData.path}/${post.outputPath}`,
          title: post.title,
        })),
      });

      return MainLayout({
        molino,
        title: 'Homepage - javiercejudo.com',
        description: 'Javier Cejudo’s personal website',
        pageIsHome: true,
        styles: ['home/index.css'],
        editLinks: [
          {
            linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/home/template.mustache`,
            linkText: 'Edit page',
          }
        ],
        content: await Page({
          hasProjects: projects.length > 0,
          projects: projects,
          hasPosts: posts.length > 0,
          blogData,
          postsList,
        }),
      });
    },
    output: {
      publicPath: path.join('src', 'static'),
      relativePath: 'index.html',
    },
  });
};

module.exports = homeBuilder;
