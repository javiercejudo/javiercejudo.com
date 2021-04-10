// @ts-nocheck

const init = () => {
  const themes = ['jc-dark', 'jc-light'];
  const themeSwitcher = document.createElement('button');

  const getNextTheme = currentTheme =>
    themes[
      (themes.findIndex(theme => theme === currentTheme) + 1) % themes.length
    ];

  const setNextTheme = currentTheme => el => {
    const nextTheme = getNextTheme(currentTheme);
    el.dataset.nextTheme = nextTheme;

    if (nextTheme === 'jc-dark') {
      el.textContent = 'Switch to dark theme';
    } else if (nextTheme === 'jc-light') {
      el.textContent = 'Switch to light theme';
    } else {
      el.textContent = 'Switch to next theme';
    }
  };

  const savedTheme = localStorage.getItem('jc-theme');

  if (savedTheme !== null) {
    document.body.parentElement.dataset.theme = savedTheme;
  }

  const currentTheme = document.documentElement.dataset.theme;
  setNextTheme(currentTheme)(themeSwitcher);

  const setTheme = theme => {
    document.documentElement.dataset.theme = theme;
    const els = document.querySelectorAll('.jc-theme-switcher > button');
    els.forEach(setNextTheme(theme));

    try {
      localStorage.setItem('jc-theme', document.documentElement.dataset.theme);
    } catch (_) {
      // ignore
    }
  };

  document.querySelectorAll('.jc-theme-switcher').forEach(switcherRoot => {
    const switcher = themeSwitcher.cloneNode(true);

    switcher.addEventListener('click', ev =>
      setTheme(ev.target.dataset.nextTheme)
    );

    switcherRoot.append(switcher);
  });
};

export default init;
