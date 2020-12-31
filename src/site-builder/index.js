const Mustache = require('mustache');
const path = require('path');

const siteBuilder = ({pageBuilders}) => async ({
  configureBuildPage,
  registryStream,
}) => {
  const buildPage = configureBuildPage({
    layoutsFolderPath: path.join('src', 'layouts'),
    layoutFilename: 'main.mustache',
    outputFolderPath: path.join('src', 'static'),
    // you may add partials or other Mustache-specific options here
    render: (template, viewData) => Mustache.render(template, viewData),
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
    console.log('Someting went wrong:');
    console.log(err);
  }
};

module.exports = siteBuilder;
