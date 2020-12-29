const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const Mustache = require('mustache');

const identity = x => x;

const renderPageHtml = async ({sourcePath, render}) => {
  return new Promise((resolve, reject) => {
    const onReadPage = (err, page) =>
      err ? reject(err) : resolve(render(page.toString()));

    fs.readFile(sourcePath, onReadPage);
  });
};

const buildLayout = ({sourcePath, outputPath, render}) => {
  return new Promise((resolve, reject) => {
    const onWrite = output => err => (err ? reject(err) : resolve(output));

    const onReadLayout = (err, layout) => {
      if (err) {
        return reject(err);
      }

      const output = render(layout.toString());

      mkdirp(path.dirname(outputPath), function (err) {
        if (err) {
          return reject(err);
        }

        fs.writeFile(outputPath, output, onWrite(output));
      });
    };

    fs.readFile(sourcePath, onReadLayout);
  });
};

const configureBuildPage = ({registryStream}) => ({
  layoutsFolderPath: defaultLayoutsFolderPath = 'layouts',
  layoutPath: defaultLayoutPath = 'base.html',
  outputFolderPath: defaultOutputFolderPath = 'public',
  render: defaultRender = identity,
  renderPage: defaultRenderPage = defaultRender,
  renderLayout: defaultRenderLayout = defaultRender,
} = {}) => async ({
  pageSourcePath,
  relativeOutputPath,
  layoutsFolderPath = defaultLayoutsFolderPath,
  layoutPath = defaultLayoutPath,
  outputFolderPath = defaultOutputFolderPath,
  data = {},
  layoutData = {},
  renderPage = defaultRenderPage,
  renderLayout = defaultRenderLayout,
}) => {
  const outputPath = path.join(outputFolderPath, relativeOutputPath);
  const publicFolderDepth = outputFolderPath.split(path.sep).length;

  const baseDistance =
    outputPath.split(path.sep).length - (publicFolderDepth + 1);

  const templateHelpers = {
    baseHref: '../'.repeat(baseDistance) || './',
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
  };

  const renderPageWithData = template =>
    renderPage(template, {...templateHelpers, ...data});

  const body = await renderPageHtml({
    sourcePath: pageSourcePath,
    render: renderPageWithData,
  });

  const html = await buildLayout({
    sourcePath: path.join(layoutsFolderPath, layoutPath),
    outputPath,
    render: layout =>
      renderLayout(layout, {
        ...templateHelpers,
        ...layoutData,
        body,
      }),
  });

  registryStream.write(outputPath + '\n');

  return {
    outputPath,
    html,
  };
};

const defaultSiteBuilder = ({builders, partials}) => async ({
  registryStream,
  configureBuildPage,
}) => {
  const buildPage = configureBuildPage({
    registryStream,
    layoutsFolderPath: path.join('src', 'layouts'),
    layoutPath: 'main.mustache',
    outputFolderPath: path.join('src', 'static'),
    render: (template, viewData) =>
      Mustache.render(template, viewData, partials),
  });

  try {
    const pagesInfo = await Promise.all(
      builders.map(builder => builder({buildPage}))
    );
    pagesInfo.map(pageInfo => console.log(`Built ${pageInfo.outputPath}`));

    console.log('Done');
  } catch (err) {
    console.log('Someting went wrong:');
    console.log(err);
  }
};

const build = async ({
  builders = [],
  partials = {},
  siteBuilder = defaultSiteBuilder({builders, partials}),
  registryName = 'molino-registry.txt',
} = {}) => {
  fs.writeFile(registryName, '', async err => {
    if (err) {
      console.log(err);
      return;
    }

    const registryStream = fs.createWriteStream(registryName, {
      flags: 'a',
    });

    try {
      await siteBuilder({
        configureBuildPage: configureBuildPage({registryStream}),
      });
    } catch (err) {
      console.log(err);
    } finally {
      registryStream.end();
    }
  });
};

module.exports = {
  build,
};
