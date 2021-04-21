import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import serveStatic from 'serve-static';

import router from './src/pages/router.mjs';
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
