// Stylesheets loaded on every page, in cascade order. Previously these
// were the `@import`s of `assets/css/common/index.css`; now the builder
// collects them into the page's `<link>` list (common first, then page
// styles) so the browser downloads them in parallel instead of resolving
// imports at runtime. Paths are relative to the page's `<base href>`
// (the static root). `normalize.css` is vendored from normalize.css
// v8.0.1 (see `assets/css/common/normalize.css`).
module.exports = [
  'assets/css/common/normalize.css',
  'assets/css/common/border-box.css',
  'assets/css/common/html-and-body.css',
  'assets/css/common/typography.css',
  'assets/css/common/page.css',
  'assets/css/common/logo.css',
  'assets/css/common/header.css',
  'assets/css/common/footer.css',
  'assets/css/common/theme-switcher.css',
];
