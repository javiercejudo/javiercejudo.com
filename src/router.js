const fs = require('fs');
const util = require('util');
const express = require('express');
const path = require('path');
const Mustache = require('mustache');

const readFile = util.promisify(fs.readFile);

module.exports = ({templatesPath}) => {
  const router = express.Router({strict: true});

  const clockHandler = async (_, res) => {
    const template = await readFile(
      path.join(templatesPath, 'clock', 'index.html')
    );

    res.send(
      Mustache.render(template.toString(), {
        data: {time: new Date().toISOString()},
      })
    );
  };
  router.get(`/clock/`, clockHandler);
  router.get(`/clock/index.html`, clockHandler);

  return router;
};
