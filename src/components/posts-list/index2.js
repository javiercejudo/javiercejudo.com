const path = require('path');
const Mustache = require('mustache');
const {css} = require('@emotion/css');
const getTemplatePromise = require('../getTemplatePromise');

const stylesClass = css`
  list-style: none;
  padding: 0;

  > li {
    padding: calc(8rem / 16) 0;
  }
`;

/** @type Promise<string> */
let templatePromise;

/**
 * @typedef Post - a post in the postsList
 * @property {string} link - the link to the post
 * @property {string} title - the title of the post
 */

/**
 * @typedef Props - postsList props
 * @property {Post[]} posts - the list of posts
 */

/**
 * @param {Props} props
 * @returns {Promise<string>}
 */
module.exports = async ({posts}) => {
  templatePromise = getTemplatePromise(
    templatePromise,
    path.join(__dirname, 'index.mustache')
  );

  const template = await templatePromise;

  return Mustache.render(template, {posts, stylesClass});
};
