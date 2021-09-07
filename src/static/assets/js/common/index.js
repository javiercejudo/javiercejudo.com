// @ts-nocheck

import {listen} from './quicklink.mjs';
// import {listen} from '../../../../../node_modules/quicklink/dist/quicklink.mjs';
// import {start} from '../../../../../node_modules/@hotwired/turbo/dist/turbo.es2017-esm.js';

window.addEventListener('load', () => {
  listen({
    relAttr: 'prerender',
    // make prerender opt-in only
    ignores: [(_uri, elem) => !elem.hasAttribute('data-prerender')],
  });
  listen({
    relAttr: 'prefetch',
    // make prerender opt-out only
    ignores: [
      (_uri, elem) =>
        elem.hasAttribute('data-prerender') ||
        elem.hasAttribute('data-noprefetch'),
    ],
  });
  // start();
});
