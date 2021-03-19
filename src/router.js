const express = require('express');
const clockData = require('./pages/clock/data');
const makeClockHandler = require('./pages/clock/handler');

module.exports = ({templatesPath}) => {
  const router = express.Router({strict: true});

  const simpleRoute = (path, handler) => {
    router.get(`/${path.replace(/index\.html$/, '')}`, handler);
    router.get(`/${path}`, handler);
  };

  simpleRoute(clockData.relativeOutputPath, makeClockHandler({templatesPath}));

  return router;
};
