const fs = require('fs');
const util = require('util');
const path = require('path');
const Mustache = require('mustache');
const clockData = require('./data');

const readFile = util.promisify(fs.readFile);

const clockHandler = ({templatesPath}) => async (_, res) => {
  try {
    const template = await readFile(
      path.join(templatesPath, ...clockData.path.split('/'))
    );

    res.send(
      Mustache.render(template.toString(), {
        time: new Date().toISOString(),
      })
    );
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};

module.exports = clockHandler;
