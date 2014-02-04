var
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  download = require('gulp-download'),
  imagemin = require('gulp-imagemin'),
  jshint = require('gulp-jshint'),
  less = require('gulp-less'),
  minifycss = require('gulp-minify-css'),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify');

var paths = {
  assets: 'assets',
  bower: 'bower_components',
  css: 'css',
  data: 'data',
  fonts: 'fonts',
  js: 'js',
  minifiedPartials: this.tmp + '/partials',
  tmp: 'tmp',
  partials: 'partials',
  tests: 'tests',
  vendor: 'vendor'
};

gulp.task('jshint', function() {
  var jsHintableScripts = [
    'gulpfile.js',
    paths.js + '/**/*.js',
    paths.tests + '/**/*.js'
  ];

  return gulp.src(jsHintableScripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('clean-pre', function() {
  var pathsToClean = [
    'assets.map.json',
    paths.assets,
    paths.fonts,
    paths.minifiedPartials,
    paths.css + '/**/*.css'
  ];

  return gulp.src(pathsToClean, {read: false})
    .pipe(clean());
});

gulp.task('clean-partials', function() {
  var pathsToClean = [
    paths.minifiedPartials
  ];

  return gulp.src(pathsToClean, {read: false})
    .pipe(clean());
});

gulp.task('clean-assets', function() {
  var pathsToClean = [
    paths.assets + '/app.css',
    paths.assets + '/app.js',
    paths.assets + '/top.js'
  ];

  return gulp.src(pathsToClean, {read: false})
    .pipe(clean());
});

gulp.task('download-firebase', function() {
  return download('https://cdn.firebase.com/v0/firebase.js')
    .pipe(rename('firebase.js'))
    .pipe(gulp.dest(paths.vendor + '/firebase'));
});

gulp.task('download-data', function() {
  return download('https://c3jud0.firebaseio.com/.json?print=pretty')
    .pipe(rename('c3jud0-export.json'))
    .pipe(gulp.dest(paths.data));
});

gulp.task('js-app', function() {
  var appJsScripts = [
    //paths.bower + '/modernizr/modernizr.custom.js',
    paths.bower + '/angular/angular.js',
    paths.bower + '/angular-route/angular-route.js',
    paths.bower + '/angular-sanitize/angular-sanitize.js',
    paths.bower + '/angular-touch/angular-touch.js',
    paths.bower + '/angular-animate/angular-animate.js',
    paths.bower + '/angularfire/angularfire.js',
    paths.bower + '/ngstorage/ngStorage.js',
    paths.partials + '/templates.js',
    paths.js + '/config.js',
    paths.js + '/JcApp.js',
    paths.js + '/AppDirectives.js',
    paths.js + '/AppFilters.js',
    paths.js + '/**/*.js'
  ];

  return gulp.src(appJsScripts)
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest('assets'));
});

gulp.task('js-top', function() {
  var topJsScripts = [
    paths.bower + '/html5shiv/dist/html5shiv.js',
    paths.bower + '/respond/dest/respond.src.js'
  ];

  return gulp.src(topJsScripts)
    .pipe(concat("top.js"))
    .pipe(uglify())
    .pipe(gulp.dest('assets'));
});

gulp.task('download', ['download-firebase', 'download-data']);

gulp.task('scripts', ['clean-pre'], function () {
  gulp.start('js-app', 'js-top');
});

gulp.task('default', ['jshint', 'download', 'scripts']);