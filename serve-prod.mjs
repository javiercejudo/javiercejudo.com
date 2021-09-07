import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import serveStatic from 'serve-static';
import path from 'path';

import router from './src/pages/router.mjs';

const port = 8081;
const app = express();
app.set('etag', false);
app.use(helmet());
app.use(compression());
app.use(router({templatesPath: path.join('dist')}));

app.use(
  serveStatic('dist', {
    maxAge: '365d',
    setHeaders: setCustomCacheControl,
    etag: false,
    lastModified: false,
    cacheControl: false,
  })
);

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

function setCustomCacheControl(res, path) {
  const contentType = serveStatic.mime.lookup(path);
  if (contentType === 'text/html') {
    res.set({
      'Cache-Control': 'public, max-age=10, stale-while-revalidate=50',
    });
  } else if (
    contentType === 'text/css' ||
    contentType === 'application/javascript'
  ) {
    res.set({
      'Cache-Control': `public, max-age=${60 * 60 * 24 * 365}`,
    });
  }
}
