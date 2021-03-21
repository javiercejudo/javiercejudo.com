const path = require('path');
const Mustache = require('mustache');
const blogData = require('./data');

const blogHomeBuilder = async ({buildPage, loadComponent}) => {
  const postsList = await loadComponent(
    path.join('src', 'components', 'posts-list', 'index.mustache')
  );

  return buildPage({
    pageSourcePath: path.join(__dirname, 'index.mustache'),
    relativeOutputPath: path.join(blogData.path, 'index.html'),
    renderPage: (...args) => Mustache.render(...args, {postsList}),
    layoutData: (content, {molino, commonData}) => ({
      content,
      molino,
      commonData,
      title: 'Blog - javiercejudo.com',
      description: 'Javier Cejudo’s blog',
      styles: ['blog/index.css'],
    }),
    pageData: ({molino}) => ({
      molino,
      blogData,
      hasPosts: blogData.posts.length > 0,
      component: {
        postsList: {
          path: blogData.path,
          posts: blogData.posts,
        },
      },
    }),
  });
};

module.exports = blogHomeBuilder;
