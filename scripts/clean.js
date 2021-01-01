#!/usr/bin/env node

const fs = require('fs');
const readline = require('readline');

const registryPath = process.env.MOLINO_REGISTRY_PATH || 'molino-registry.txt';

const lineReader = readline.createInterface({
  input: fs.createReadStream(registryPath),
});

lineReader.on('line', line => {
  fs.unlink(line, err => {
    if (!err) {
      return console.log(`Deleted ${line}`);
    }

    if (err.code === 'ENOENT') {
      return;
    }

    console.error(`Unable to delete ${line}`);
    console.error(err);
  });
});
