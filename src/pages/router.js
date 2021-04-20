const express = require('express');
const clockData = require('./clock/data');
const blogData = require('./blog/data');
const makeClockHandler = require('./clock/handler');
// const makeBlogPostHandler = require('./blog/posts-collection/handler');

/**
 * @typedef RouterProps
 * @property {string} templatesPath
 */

/**
 * @param {RouterProps} props
 * @returns {express.Router}
 */
const router = ({templatesPath}) => {
  const router = express.Router({strict: true});

  /**
   * @param {string} path
   * @param {express.RequestHandler} handler
   */
  const simpleRoute = (path, handler) => {
    router.get(`${path.replace(/index\.html$/, '')}`, handler);
    router.get(path, handler);
  };

  simpleRoute(`/${clockData.path}`, makeClockHandler({templatesPath}));

  // simpleRoute(
  //   `/${blogData.path}/:slug/index.html`,
  //   makeBlogPostHandler({templatesPath})
  // );

  return router;
};

module.exports = router;
