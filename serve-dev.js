const express = require('express');
const serveStatic = require('serve-static');
const serveIndex = require('serve-index');
const path = require('path');

const router = require('./src/pages/router');
const port = 8081;
const app = express();
app.use('/src/static', router({templatesPath: path.join('src', 'static')}));
app.use(serveStatic('.', {maxAge: '0'}));
app.use('.', serveIndex(__dirname));

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
