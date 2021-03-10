const express = require('express');
const serveStatic = require('serve-static');

const router = require('./src/router');

const app = express();
app.use(router({templatesPath: 'dist'}));

app.use(
  serveStatic('dist', {
    maxAge: '365d',
    setHeaders: setCustomCacheControl,
  })
);

app.listen(8080);

function setCustomCacheControl(res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'public, max-age=0');
  }
}
