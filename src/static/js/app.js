import {listen} from 'quicklink';
import {start} from '@hotwired/turbo';
// import Turbolinks from 'turbolinks';

window.addEventListener('load', () => {
  listen();
  start();
  // Turbolinks.start();
});
