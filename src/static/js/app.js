import {listen} from 'quicklink';
import Turbolinks from 'turbolinks';

window.addEventListener('load', () => {
  listen();
  Turbolinks.start();
});
