#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

fs.unlink(path.join('build', 'index.html'), err => {
  if (err) throw err;
  console.log('path/file.txt was deleted');
});
