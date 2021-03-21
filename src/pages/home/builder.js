const path = require('path');
const Mustache = require('mustache');
const blogData = require('../blog/data');
const projectsData = require('../projects/projects-collection/data');

const homeBuilder = async ({buildPage, loadComponent}) => {
  const postsList = await loadComponent(
    path.join('src', 'components', 'posts-list', 'index.mustache')
  );

  return buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: 'index.html',
    renderPage: (...args) => Mustache.render(...args, {postsList}),
    layoutData: (content, {molino, commonData}) => ({
      content,
      molino,
      commonData,
      title: 'Homepage - javiercejudo.com',
      description: 'Javier Cejudo’s personal website',
      pageIsHome: true,
      styles: ['home/index.css'],
    }),
    pageData: ({molino}) => ({
      molino,
      hasProjects: projectsData.length > 0,
      projects: projectsData,
      hasPosts: blogData.posts.length > 0,
      blogData,
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

module.exports = homeBuilder;
