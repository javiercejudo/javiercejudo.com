const path = require('path');
const Mustache = require('mustache');
const blogData = require('../blog/data');
const projectsData = require('../projects/projects-collection/data');
const postsList = require('../../components/posts-list/api');

/** @type import('../builders').Builder */
const homeBuilder = async ({buildPage, loadComponent}) => {
  const postsListPartial = await loadComponent(
    path.join('src', 'components', 'posts-list', 'index.mustache')
  );

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
    pageData: ({molino}) => ({
      hasProjects: projectsData.length > 0,
      projects: projectsData,
      hasPosts: blogData.posts.length > 0,
      blogData,
      component: {
        postsList: postsList({
          posts: blogData.posts.map(post => ({
            link: `${molino.baseHref}${blogData.path}/${post.outputPath}`,
            title: post.title,
          })),
        }),
      },
    }),
  });
};

module.exports = homeBuilder;
