const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const readline = require('readline');
const fse = require('fs-extra');
const neek = require('neek');

/**
 * @param {string} outputPath
 * @param {string} publicPath
 */
const getBaseHref = (outputPath, publicPath) => {
  const publicPathDepth = publicPath.split(path.sep).length;

  const baseDistance =
    outputPath.split(path.sep).length - (publicPathDepth + 1);

  return '../'.repeat(baseDistance) || './';
};

/**
 * @typedef MolinoHelpers
 * @property {string} baseHref
 * @property {string} relativePath
 * @property {boolean} isProd
 * @property {boolean} isDev
 */

/**
 * @typedef GetMolinoHelpersInput
 * @property {string} outputPath
 * @property {string} publicPath
 * @property {string} relativePath
 */

/**
 * @param {GetMolinoHelpersInput} input
 * @returns {MolinoHelpers}
 */
const getMolinoHelpers = ({outputPath, publicPath, relativePath}) => {
  const isDev = process.env.NODE_ENV === 'development';

  return {
    baseHref: getBaseHref(outputPath, publicPath),
    relativePath,
    isProd: !isDev,
    isDev,
  };
};

/**
 * @callback PageRenderFn
 * @param {MolinoHelpers} molinoHelpers
 * @returns {Promise<string>}
 */

/**
 * @template PageData
 * @callback PageDataMapper
 * @param {MolinoHelpers} helpers
 * @returns {Promise<PageData>}
 */

/**
 * @template LayoutData
 * @callback LayoutDataMapper
 * @param {string} content
 * @param {MolinoHelpers} helpers
 * @returns {Promise<LayoutData>}
 */

/**
 * @typedef Output
 * @property {string} publicPath
 * @property {string} relativePath
 */

/**
 * @typedef BuildPageInput
 * @property {PageRenderFn} page
 * @property {PageRenderFn} [layout]
 * @property {Output} output
 */

/**
 * @typedef BuildPageOutput
 * @property {string} path
 * @property {string} html
 */

/**
 * @callback BuildPage
 * @param {BuildPageInput} input
 * @returns {Promise<BuildPageOutput>}
 */

/**
 * @type {BuildPage}
 */
const buildPage = async ({page, output}) => {
  const outputPath = path.join(output.publicPath, output.relativePath);

  const molinoHelpers = getMolinoHelpers({
    outputPath,
    publicPath: output.publicPath,
    relativePath: output.relativePath,
  });

  return {
    html: await page(molinoHelpers),
    path: outputPath,
  };
};

/**
 * @typedef BuildInput
 * @property {() => Promise<BuildPageOutput>[]} siteBuilder
 * @property {string} [registryPath]
 */

/**
 * @param {BuildInput} input
 */
const build = async ({siteBuilder, registryPath = 'sitemap.txt'}) => {
  const registryStream = fs.createWriteStream(registryPath, {
    flags: 'a',
  });

  const pagesInfo = siteBuilder();

  pagesInfo.forEach(pageInfo => {
    pageInfo.then(info => {
      registryStream.write(`${info.path}\n`);
      fse.outputFileSync(info.path, info.html);
    });
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
    } catch (/** @type {any} */ err) {
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
