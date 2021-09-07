// @ts-nocheck
import getFormattedTime from './shared.mjs';

const templateNode = document.getElementById('time-template');
const template = templateNode.innerHTML;

const render = () => {
  const time = getFormattedTime();
  const html = Mustache.render(template, {time});
  document.getElementById('clock-content').parentElement.innerHTML = html;
};

render();
setInterval(render, 1000);
