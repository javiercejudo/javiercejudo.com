const fs = require('fs/promises');
const path = require('path');
const Mustache = require('mustache');

/**
 * @typedef Post - a post in the postsList
 * @property {string} link - the link to the post
 * @property {string} title - the title of the post
 */

/**
 * @typedef Props - postsList props
 * @property {Post[]} posts - the list of posts
 */

/** @type Promise<string> */
let templatePromise;

/** @returns {Promise<(props: Props) => string>} */
module.exports = async () => {
  if (templatePromise === undefined) {
    templatePromise = fs
      .readFile(path.join(__dirname, 'index.mustache'))
      .then(b => {
        const template = b.toString();
        Mustache.parse(template);

        return template;
      });
  }

  const template = await templatePromise;

  return ({posts}) => {
    return Mustache.render(template, {posts});
  };
};
