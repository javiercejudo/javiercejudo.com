const fs = require('fs');
const util = require('util');
const path = require('path');
const Mustache = require('mustache');
const clockData = require('./data');

const readFile = util.promisify(fs.readFile);

/**
 * @typedef HandlerProps
 * @property {string} templatesPath
 */

/**
 * @param {HandlerProps} props
 * @returns {import('express').RequestHandler}
 */
const clockHandler = ({templatesPath}) => async (_, res) => {
  try {
    const template = await readFile(
      path.join(templatesPath, ...clockData.path.split('/'))
    );

    /** @type import('./builder').ClockPage */
    const view = {
      time: new Date().toISOString(),
    };

    res.send(Mustache.render(template.toString(), view));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = clockHandler;
