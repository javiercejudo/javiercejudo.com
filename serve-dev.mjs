import express from 'express';
// import helmet from 'helmet';
import serveStatic from 'serve-static';
import serveIndex from 'serve-index';
import path from 'path';

import router from './src/pages/router.mjs';

const port = 8081;
const app = express();
// app.use(helmet());
app.use('/src/static', router({templatesPath: path.join('src', 'static')}));
app.use(serveIndex('.'));

app.use(
  serveStatic('.', {
    maxAge: '365d',
    setHeaders: setCustomCacheControl,
  })
);

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}/src/static/index.html`);
});

function setCustomCacheControl(res, path) {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    res.setHeader(
      'Cache-Control',
      'public, max-age=10, stale-while-revalidate=50'
      // 'no-store, must-revalidate'
    );
  }
}
