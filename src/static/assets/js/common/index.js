// @ts-nocheck

import initTheme from './theme.js';
import {listen} from '../../../../../node_modules/quicklink/dist/quicklink.mjs';
// import {start} from '../../../../../node_modules/@hotwired/turbo/dist/turbo.es2017-esm.js';

try {
  initTheme();
} catch (e) {
  console.error(e)
}

document.body.style.display = 'block';

window.addEventListener('load', () => {
  listen({ignores: [(_uri, elem) => elem.hasAttribute('data-noprefetch')]});
  // start();
});
