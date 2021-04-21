const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const serveStatic = require('serve-static');

const router = require('./src/pages/router');
const port = 8080;
const app = express();
app.use(helmet());
app.use(compression());
app.use(router({templatesPath: 'dist'}));

app.use(
  serveStatic('dist', {
    maxAge: '365d',
    setHeaders: (res, path) => {
      if (serveStatic.mime.lookup(path) === 'text/html') {
        res.set({
          'Cache-Control': 'public, max-age=10, stale-while-revalidate=50',
        });
      }
    },
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
