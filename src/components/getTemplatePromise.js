const fs = require('fs/promises');
const Mustache = require('mustache');

/**
 * @param {Promise<string>} templatePromise
 * @param {string} path
 * @return {Promise<string>}
 */
const getTemplatePromise = (templatePromise, path) => {
  if (templatePromise === undefined) {
    templatePromise = fs.readFile(path).then(b => {
      const template = b.toString();
      Mustache.parse(template);

      return template;
    });
  }

  return templatePromise;
};

module.exports = getTemplatePromise;
