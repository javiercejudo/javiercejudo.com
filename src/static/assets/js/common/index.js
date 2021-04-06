// @ts-nocheck

import {listen} from '../../../../../node_modules/quicklink/dist/quicklink.mjs';
// import {start} from '../../../../../node_modules/@hotwired/turbo/dist/turbo.es2017-esm.js';

window.addEventListener('load', () => {
  listen({ignores: [(_uri, elem) => elem.hasAttribute('data-noprefetch')]});
  // start();
});

const themes = ['jc-dark', 'jc-light'];
const themeSwitcher = document.createElement('button');
const getNextTheme = currentTheme =>
  themes[
    (themes.findIndex(theme => theme === currentTheme) + 1) % themes.length
  ];
const setNextThemeText = nextTheme => {
  if (nextTheme === 'jc-dark') {
    themeSwitcher.textContent = 'Switch to dark theme';
  } else if (nextTheme === 'jc-light') {
    themeSwitcher.textContent = 'Switch to light theme';
  }
};
const savedTheme = localStorage.getItem('jc-theme');
if (savedTheme !== null) {
  document.body.parentElement.dataset.theme = savedTheme;
}
const currentTheme = document.body.parentElement.dataset.theme;
themeSwitcher.dataset.nextTheme = getNextTheme(currentTheme);
setNextThemeText(themeSwitcher.dataset.nextTheme);

const setTheme = target => {
  document.body.parentElement.dataset.theme = target.dataset.nextTheme;
  target.dataset.nextTheme = getNextTheme(target.dataset.nextTheme);
  setNextThemeText(target.dataset.nextTheme);
  localStorage.setItem('jc-theme', document.body.parentElement.dataset.theme);
};
themeSwitcher.addEventListener('click', ev => setTheme(ev.target));
document.getElementById('theme-switcher').append(themeSwitcher);
