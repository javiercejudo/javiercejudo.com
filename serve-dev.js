const express = require('express');
// const helmet = require('helmet');
const serveStatic = require('serve-static');
const serveIndex = require('serve-index');
const path = require('path');

const router = require('./src/router');
const port = 8081;
const app = express();
// Disabled in dev because it interferes with LiveReload
// app.use(helmet());
app.use('/src/static', router({templatesPath: path.join('src', 'static')}));
app.use(serveStatic('.', {maxAge: '0'}));
app.use('.', serveIndex(__dirname));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
