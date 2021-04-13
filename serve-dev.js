const express = require('express');
// const helmet = require('helmet');
const serveStatic = require('serve-static');
const serveIndex = require('serve-index');
const path = require('path');

const router = require('./src/pages/router');
const port = 8081;
const app = express();
// app.use(helmet());
app.use('/src/static', router({templatesPath: path.join('src', 'static')}));
app.use(serveIndex(__dirname));

app.use(
  serveStatic('.', {
    maxAge: '365d',
    setHeaders: setCustomCacheControl,
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

function setCustomCacheControl(res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    res.setHeader(
      'Cache-Control',
      'public, max-age=10, stale-while-revalidate=50'
    );
  }
}
