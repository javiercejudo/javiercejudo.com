const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const readline = require('readline');
const makeDir = require('make-dir');
const neek = require('neek');

/**
 * @template T
 * @callback Identity
 * @param {T} x
 * @returns {T}
 */

/** @type Identity<string> */
const identityRender = x => x;

/**
 * @typedef RenderPageHtmlProps
 * @property {string} sourcePath
 * @property {(template: string) => string} render
 */

/**
 * @callback RenderPageHtml
 * @param {RenderPageHtmlProps} props
 * @returns {Promise<string>}
 */

/** @type RenderPageHtml */
const renderPageHtml = async ({sourcePath, render}) =>
  fsp.readFile(sourcePath).then(page => render(page.toString()));

/**
 * @typedef BuildLayoutProps
 * @property {string} sourcePath
 * @property {string} outputPath
 * @property {(template: string) => string} render
 */

/**
 * @callback BuildLayout
 * @param {BuildLayoutProps} props
 * @returns {Promise<string>}
 */

/** @type BuildLayout */
const buildLayout = async ({sourcePath, outputPath, render}) => {
  const layout = await fsp.readFile(sourcePath);
  const output = render(layout.toString());
  await makeDir(path.dirname(outputPath));
  await fsp.writeFile(outputPath, output);

  return output;
};

/**
 * @typedef TemplateHelpers
 * @property {string} baseHref
 * @property {string} relativeOutputPath
 * @property {string} relativeLayoutSourcePath
 * @property {string} relativePageSourcePath
 * @property {boolean} isProd
 * @property {boolean} isDev
 */

/**
 * @template Layout
 * @callback LayoutData
 * @param {string} content
 * @param {TemplateHelpers} helpers
 * @returns {Layout}
 */

/**
 * @template T
 * @callback PageData
 * @param {TemplateHelpers} helpers
 * @returns {T}
 */

/**
 * @template T
 * @callback RenderFn
 * @param {string} template
 * @param {T} data
 * @returns {string}
 */

/**
 * @template Layout, Page
 * @typedef BuildPageProps
 * @property {string} [layoutFolderPath]
 * @property {string} [relativeLayoutSourcePath]
 * @property {string} [sourceFolderPath]
 * @property {string} relativePageSourcePath
 * @property {string} [outputFolderPath]
 * @property {string} relativeOutputPath
 * @property {LayoutData<Layout>} [layoutData]
 * @property {PageData<Page>} [pageData]
 * @property {RenderFn<Layout>} [renderLayout]
 * @property {RenderFn<Page>} [renderPage]
 */

/**
 * @typedef {Object} BuiltPageInfo
 * @property {string} outputPath
 * @property {string} html
 */

/**
 * @template Layout, Page
 * @callback BuildPage
 * @param {BuildPageProps<Layout, Page>} props
 * @returns {Promise<BuiltPageInfo>}
 */

/**
 * @param {string} content
 * @return {any}
 */
const defaultLayoutData = content => ({content});

/**
 * @return {any}
 */
const defaultPageData = () => ({});

/**
 * @template Layout, Page
 * @type {BuildPage<Layout, Page>}
 */
const buildPage = async ({
  layoutFolderPath = 'layouts',
  relativeLayoutSourcePath = 'base.html',
  sourceFolderPath = 'src/pages',
  relativePageSourcePath,
  outputFolderPath = 'public',
  relativeOutputPath,
  layoutData = defaultLayoutData,
  pageData = defaultPageData,
  renderLayout = identityRender,
  renderPage = identityRender,
}) => {
  const outputPath = path.join(outputFolderPath, relativeOutputPath);
  const publicFolderDepth = outputFolderPath.split(path.sep).length;

  const baseDistance =
    outputPath.split(path.sep).length - (publicFolderDepth + 1);

  /** @type TemplateHelpers */
  const templateHelpers = {
    baseHref: '../'.repeat(baseDistance) || './',
    isProd: process.env.NODE_ENV === 'production',
    isDev: process.env.NODE_ENV === 'development',
    relativeLayoutSourcePath,
    relativePageSourcePath,
    relativeOutputPath,
  };

  const content = await renderPageHtml({
    sourcePath: path.join(sourceFolderPath, relativePageSourcePath),
    render: template => renderPage(template, pageData(templateHelpers)),
  });

  const html = await buildLayout({
    sourcePath: path.join(layoutFolderPath, relativeLayoutSourcePath),
    outputPath,
    render: layout =>
      renderLayout(layout, layoutData(content, templateHelpers)),
  });

  return {
    outputPath,
    html,
  };
};

/**
 * @typedef BuildProps
 * @property {() => Promise<BuiltPageInfo>[]} siteBuilder
 * @property {string} [registryPath]
 */

/**
 * @param {BuildProps} props
 */
const build = async ({siteBuilder, registryPath = 'sitemap.txt'}) => {
  const registryStream = fs.createWriteStream(registryPath, {
    flags: 'a',
  });

  const pagesInfo = siteBuilder();

  pagesInfo.forEach(pageInfo => {
    pageInfo.then(info => registryStream.write(`${info.outputPath}\n`));
  });

  await Promise.all(pagesInfo);
  registryStream.write(`\n`);

  registryStream.end(async () => {
    try {
      await fsp.copyFile(registryPath, registryPath + '.temp');
    } catch (_) {
      console.error('Unable to deduplicate registry.');
    }
    neek.unique(registryPath + '.temp', registryPath, async () => {
      try {
        await fsp.unlink(registryPath + '.temp');
      } catch (_) {
        return console.error(`Unable to delete intermediary registry.`);
      }

      console.log(`Registry deduplicated.`);
    });
  });
};

const clean = async ({registryPath = 'sitemap.txt'} = {}) => {
  try {
    await fsp.access(registryPath, fs.constants.F_OK);
  } catch (_) {
    return;
  }

  const lineReader = readline.createInterface({
    input: fs.createReadStream(registryPath),
  });

  lineReader.on('line', async line => {
    try {
      await fsp.unlink(line);
      console.log(`Deleted ${line}.`);
    } catch (err) {
      if (err.code === 'ENOENT') {
        return;
      }

      console.error(`Unable to delete ${line}`);
      console.error(err);
    }
  });

  lineReader.on('close', async () => {
    try {
      await fsp.writeFile(registryPath, '');
    } catch (_) {
      console.error(`Unable to clean ${registryPath}`);
      return;
    }

    console.log('Done cleaning!');
  });
};

const molino = {
  buildPage,
  build,
  clean,
};

module.exports = molino;
