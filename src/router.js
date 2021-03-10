const fs = require('fs');
const util = require('util');
const express = require('express');
const path = require('path');
const Mustache = require('mustache');

const readFile = util.promisify(fs.readFile);

module.exports = ({templatesPath}) => {
  const router = express.Router({strict: true});
  const serverRoutes = [
    {
      route: 'clock',
      handler: route => async (_, res) => {
        const template = await readFile(path.join(templatesPath, route, 'index.html'));

        res.send(
          Mustache.render(template.toString(), {time: new Date().toISOString()})
        );
      },
    },
  ];

  serverRoutes.forEach(serverRoute => {
    const handler = serverRoute.handler(serverRoute.route);
    router.get(`/${serverRoute.route}/`, handler);
    router.get(`/${serverRoute.route}/index.html`, handler);
  });

  return router;
};
