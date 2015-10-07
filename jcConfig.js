var constants, paths;

constants = {
  ASSETS_URL: process.env.ASSETS_URL || 'build'
};

paths = {
  assets: 'assets',
  build: 'build',
  bower: 'bower_components',
  npm: 'node_modules',
  css: 'css',
  data: 'data',
  fonts: 'fonts',
  ico: 'ico',
  js: 'js',
  layout: 'layout',
  tmp: 'tmp',
  partials: 'partials',
  tests: 'tests',
  vendor: 'vendor',
  wraith: 'wraith'
};

exports.constants = constants;
exports.paths = paths;
