import {listen} from '../../../../node_modules/quicklink/dist/quicklink.mjs';
// import {start} from '../../../../node_modules/@hotwired/turbo/dist/turbo.es2017-esm.js';

window.addEventListener('load', () => {
  listen({ignores: [(_uri, elem) => elem.hasAttribute('data-noprefetch')]});
  // start();
});
