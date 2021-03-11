const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const serveStatic = require('serve-static');

const router = require('./src/router');

const port = 8080;
const app = express();
app.use(helmet());
app.use(compression());
app.use(router({templatesPath: 'dist'}));

app.use(
  serveStatic('dist', {
    maxAge: '365d',
    setHeaders: setCustomCacheControl,
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function setCustomCacheControl(res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    res.setHeader('Cache-Control', 'public, max-age=0');
  }
}
