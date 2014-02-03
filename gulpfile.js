var
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  jshint = require('gulp-jshint'),
  less = require('gulp-less'),
  //autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify');

var paths = {
  js: 'js',
  bower: 'bower_components',
  partials: 'partials',
  tests: 'tests'
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

gulp.task('appjs', function() {
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
    .pipe(gulp.dest('assets'))
    .pipe(uglify())
    .pipe(gulp.dest('assets'));
});

gulp.task('topjs', function() {
  var topJsScripts = [
    paths.bower + '/html5shiv/dist/html5shiv.js',
    paths.bower + '/respond/dest/respond.src.js'
  ];

  return gulp.src(topJsScripts)
    .pipe(concat("top.js"))
    .pipe(gulp.dest('assets'))
    .pipe(uglify())
    .pipe(gulp.dest('assets'));
});

gulp.task('scripts', ['appjs', 'topjs']);

gulp.task('default', ['jshint', 'scripts']);