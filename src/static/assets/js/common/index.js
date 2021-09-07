// @ts-nocheck

import {listen} from './quicklink.mjs';
// import {listen} from '../../../../../node_modules/quicklink/dist/quicklink.mjs';
// import {start} from '../../../../../node_modules/@hotwired/turbo/dist/turbo.es2017-esm.js';

window.addEventListener('load', () => {
  // listen({
  //   relAttr: 'prefetch',
  //   ignores: [(_uri, elem) => elem.hasAttribute('data-noprefetch')],
  // });
  listen({
    relAttr: 'prerender',
    ignores: [(_uri, elem) => elem.hasAttribute('data-noprefetch')],
  });
  // start();
});
