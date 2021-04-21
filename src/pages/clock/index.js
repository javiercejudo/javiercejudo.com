// @ts-nocheck

import Mustache from '../../../node_modules/mustache/mustache.mjs';

const templateNode = document.getElementById('time-template');
const template = templateNode.innerHTML;

const render = () => {
  const now = new Date();
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  const html = Mustache.render(template, {time});
  document.getElementById('clock-content').parentElement.innerHTML = html;
};

setInterval(render, 1000);
render();
