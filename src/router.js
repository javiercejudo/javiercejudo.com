const express = require('express');
const clockData = require('./pages/clock/data');
const makeClockHandler = require('./pages/clock/handler');

module.exports = ({templatesPath}) => {
  const router = express.Router({strict: true});

  const clockHandler = makeClockHandler({templatesPath});
  router.get(
    `/${clockData.relativeOutputPath.replace('/index.html', '')}`,
    clockHandler
  );
  router.get(`/${clockData.relativeOutputPath}`, clockHandler);

  return router;
};
