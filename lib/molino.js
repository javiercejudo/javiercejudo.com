const fs = require('fs');
const util = require('util');
const path = require('path');
const readline = require('readline');
const makeDir = require('make-dir');
const Mustache = require('mustache');

// const mkdirp = util.promisify(mkdirpBase);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const identity = x => x;

const renderPageHtml = async ({sourcePath, render}) =>
  readFile(sourcePath).then(page => render(page.toString()));

const buildLayout = async ({sourcePath, outputPath, render}) => {
  const layout = await readFile(sourcePath);
  const output = render(layout.toString());
  await makeDir(path.dirname(outputPath));
  await writeFile(outputPath, output);

  return output;
};

const configureBuildPage = ({
  layoutsFolderPath: defaultLayoutsFolderPath = 'layouts',
  layoutFilename: defaultLayoutFilename = 'base.html',
  outputFolderPath: defaultOutputFolderPath = 'public',
  data: defaultData = {},
  pageData: defaultPageData = defaultData,
  layoutData: defaultLayoutData = defaultData,
  render: defaultRender = identity,
  renderPage: defaultRenderPage = defaultRender,
  renderLayout: defaultRenderLayout = defaultRender,
} = {}) => async ({
  pageSourcePath,
  relativeOutputPath,
  layoutsFolderPath = defaultLayoutsFolderPath,
  layoutFilename = defaultLayoutFilename,
  outputFolderPath = defaultOutputFolderPath,
  pageData = {},
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
    pageSourcePath,
  };

  const renderPageWithData = template =>
    renderPage(template, {...templateHelpers, ...defaultPageData, ...pageData});

  const body = await renderPageHtml({
    sourcePath: pageSourcePath,
    render: renderPageWithData,
  });

  const html = await buildLayout({
    sourcePath: path.join(layoutsFolderPath, layoutFilename),
    outputPath,
    render: layout =>
      renderLayout(layout, {
        ...templateHelpers,
        ...defaultLayoutData,
        ...layoutData,
        body,
      }),
  });

  return {
    outputPath,
    html,
  };
};

const defaultSiteBuilder = ({pageBuilders, partials}) => async ({
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
      pageBuilders.map(pageBuilder => pageBuilder({buildPage}))
    );

    pagesInfo.forEach(pageInfo => {
      registryStream.write(`${pageInfo.outputPath} \n`);
      console.log(`Built ${pageInfo.outputPath}`);
    });

    console.log('Done');
  } catch (err) {
    console.error('Someting went wrong:');
    console.error(err);
  }
};

const build = async ({
  pageBuilders = [],
  partials = {},
  siteBuilder = defaultSiteBuilder({pageBuilders, partials}),
} = {}) => {
  const registryPath =
    process.env.MOLINO_REGISTRY_PATH || 'molino-registry.txt';

  fs.writeFile(registryPath, '', async err => {
    if (err) {
      console.error(err);
      return;
    }

    const registryStream = fs.createWriteStream(registryPath, {
      flags: 'a',
    });

    try {
      await siteBuilder({registryStream, configureBuildPage});
    } catch (err) {
      console.error(err);
    } finally {
      registryStream.end();
    }
  });
};

const clean = () => {
  const registryPath =
    process.env.MOLINO_REGISTRY_PATH || 'molino-registry.txt';

  const lineReader = readline.createInterface({
    input: fs.createReadStream(registryPath),
  });

  lineReader.on('line', line => {
    fs.unlink(line, err => {
      if (!err) {
        return console.log(`Deleted ${line}`);
      }

      if (err.code === 'ENOENT') {
        return;
      }

      console.error(`Unable to delete ${line}`);
      console.error(err);
    });
  });
};

module.exports = {
  build,
  clean,
};
