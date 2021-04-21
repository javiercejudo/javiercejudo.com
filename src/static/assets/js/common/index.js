// @ts-nocheck

import {listen} from '../../../../../node_modules/quicklink/dist/quicklink.mjs';
import Mustache from '../../../../../node_modules/mustache/mustache.mjs';
// import {start} from '../../../../../node_modules/@hotwired/turbo/dist/turbo.es2017-esm.js';

window.Mustache = Mustache;
window.addEventListener('load', () => {
  listen({ignores: [(_uri, elem) => elem.hasAttribute('data-noprefetch')]});
  // start();
});
