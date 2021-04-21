import fs from 'fs';
import util from 'util';
import path from 'path';
import Mustache from 'mustache';
import clockData from './data.js';
import getFormattedTime from './shared.mjs';

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

    const time = getFormattedTime();
    /** @type import('./builder').ClockPage */
    const view = {time};

    res.send(Mustache.render(template.toString(), view));
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

export default clockHandler;
