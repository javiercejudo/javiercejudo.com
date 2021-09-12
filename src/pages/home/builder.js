const path = require('path');
const blogData = require('../blog/data');
const posts = require('../blog/posts-collection/data');
const projects = require('../projects/projects-collection/data');
const makePostsListComponent = require('../../components/posts-list');

/**
 * @typedef HomePageData
 * @property {boolean} hasProjects
 * @property {boolean} hasPosts
 * @property {blogData.BlogData} blogData
 * @property {string} postsList
 */

/** @type {import('../../../scripts/build-pages2').Builder<HomePageData>} */
const homeBuilder = async ({buildPage, MainLayout, html}) => {
  const postsListComponent = await makePostsListComponent();

  /** @type {import('../../../lib/molino2').BuildPageInput['page']} */
  const page = async molino => {
    const postsList = postsListComponent({
      posts: posts.map(post => ({
        // link: `${commonData.siteUrl}/${
        //   blogData.path
        // }/${post.outputPath.replace(/index.html$/, '')}`,
        link: `${molino.baseHref}${blogData.path}/${post.outputPath}`,
        title: post.title,
      })),
    });

    /** @param {HomePageData} props */
    const Page = ({hasProjects, hasPosts, postsList, blogData}) => html`
      <div class="container">
        <p>Hey, I'm Javier!</p>

        <!-- <div id="root"></div> -->

        ${hasProjects
          ? html`
              <h2>
                <a href="${molino.baseHref}projects/index.html">Projects</a>
              </h2>
              <ul>
                ${projects.map(
                  project => html`
                    <li>
                      <a href="${molino.baseHref}projects/${project.path}"
                        >${project.name}</a
                      >
                    </li>
                  `
                )}
              </ul>
            `
          : html`<p>No projects</p>`}
        <h2>
          <a href="${molino.baseHref}${blogData.path}/index.html">
            ${blogData.title} by ${blogData.authorName}
          </a>
        </h2>
        ${hasPosts ? postsList : html`<p>No blog posts</p>`}
      </div>
    `;

    return MainLayout({
      molino,
      title: 'Homepage - javiercejudo.com',
      description: 'Javier Cejudo’s personal website',
      pageIsHome: true,
      // scripts: ['home/index.js'],
      styles: ['home/index.css'],
      editLinks: [
        {
          linkHref: `https://github.com/javiercejudo/javiercejudo.com/blob/next-simpler/src/pages/home/builder.js`,
          linkText: 'Edit page',
        },
      ],
      content: Page({
        hasProjects: projects.length > 0,
        hasPosts: posts.length > 0,
        blogData,
        postsList,
      }),
    });
  };

  return buildPage({
    page,
    output: {
      publicPath: path.join('src', 'static'),
      relativePath: 'index.html',
    },
  });
};

module.exports = homeBuilder;
