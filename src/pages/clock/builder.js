const path = require('path');
const clockData = require('./data');

/** @typedef {import('../../../scripts/build-pages').MainLayout} MainLayout */

/**
 * @typedef ClockPage
 * @property {string} time
 */

/** @typedef {import('../../../scripts/build-pages').Builder<MainLayout, ClockPage>} ClockBuilder */

/** @type ClockBuilder */
const clockBuilder = ({buildPage}) =>
  buildPage({
    pageSourcePath: path.join(__dirname, 'template.mustache'),
    relativeOutputPath: path.join(...clockData.path.split('/')),
    layoutData: () => ({
      title: 'Clock - javiercejudo.com',
      description: 'In case you were wondering what the time is',
      scripts: ['mustache/index.js', 'clock/index.js'],
    }),
    renderPage: template => {
      return `
        ${template}
        <template id="time-template">
          {{={[{ }]}=}}
          ${template}
        </template>
      `;
    },
  });

module.exports = clockBuilder;
