/**
 * @typedef Post - a post in the postsList
 * @property {string} link - the link to the post
 * @property {string} title - the title of the post
 */

/**
 * @typedef Props - postsList props
 * @property {Post[]} posts - the list of posts
 */

/** @type {(props: Props) => Props} */
const postsList = ({posts}) => ({posts});

module.exports = postsList
