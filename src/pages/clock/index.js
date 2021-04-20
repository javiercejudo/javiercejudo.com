// @ts-nocheck

import('https://cdn.skypack.dev/mustache').then(({default: Mustache}) => {
  const templateNode = document.getElementById('time-template');

  if (!templateNode) {
    throw Error('Template could not be found');
  }

  // @ts-ignore
  const template = templateNode.innerHTML;

  const render = () => {
    const clockContent = document.getElementById('clock-content');

    const now = new Date();
    const view = {
      time: `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`,
    };

    clockContent.parentElement.innerHTML = Mustache.render(template, view);
  };

  setInterval(render, 1000);
});
