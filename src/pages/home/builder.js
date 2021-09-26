const path = require('path');
const blogData = require('../blog/data');
const posts = require('../blog/posts-collection/data');
const projects = require('../projects/projects-collection/data');
const postsListComponent = require('../../components/posts-list/index2');

/** @type {import('../../../scripts/build-pages2').Builder} */
const homeBuilder = async ({buildPage, mainLayout, html}) => {
  /** @type {import('../../../lib/molino2').PageRenderFn} */
  const page = async molinoHelpers => {
    const postsList = await postsListComponent({
      posts: posts.map(post => ({
        // link: `${customHelpers.siteUrl}/${
        //   blogData.path
        // }/${post.outputPath.replace(/index.html$/, '')}`,
        link: `${molinoHelpers.baseHref}${blogData.path}/${post.outputPath}`,
        title: post.title,
      })),
    });

    const content = html`
      <div class="container">
        <p>Hey, I'm Javier!</p>

        <!-- <div id="root"></div> -->

        <h2>
          <a href="${molinoHelpers.baseHref}projects/index.html">Projects</a>
        </h2>

        ${projects.length > 0
          ? html`
              <ul>
                ${projects.map(
                  project => html`
                    <li>
                      <a
                        href="${molinoHelpers.baseHref}projects/${project.path}"
                        >${project.name}</a
                      >
                    </li>
                  `
                )}
              </ul>
            `
          : html`<p>No projects</p>`}

        <h2>
          <a href="${molinoHelpers.baseHref}${blogData.path}/index.html">
            ${blogData.title} by ${blogData.authorName}
          </a>
        </h2>

        ${posts.length > 0 ? postsList : html`<p>No blog posts</p>`}
      </div>
    `;

    return mainLayout({
      ...molinoHelpers,
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
      content,
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
