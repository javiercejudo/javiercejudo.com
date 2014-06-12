var
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  jc = require('../jcConfig'),
  paths = jc.paths;

gulp.task('js-top', function () {
  var topJsScripts = [
    paths.bower + '/html5shiv/dist/html5shiv.js'
  ];

  return gulp.src(topJsScripts)
    .pipe(concat("top.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.assets));
});

gulp.task('js-app', function () {
  var appJsScripts = [
    //paths.vendor + '/modernizr/modernizr-custom.js',
    paths.bower + '/jquery/dist/jquery.js',
    paths.bower + '/angular/angular.js',
    paths.bower + '/angular-route/angular-route.js',
    paths.bower + '/angular-sanitize/angular-sanitize.js',
    paths.bower + '/angular-touch/angular-touch.js',
    paths.bower + '/angular-animate/angular-animate.js',
    paths.bower + '/angularfire/angularfire.js',
    paths.bower + '/ngstorage/ngStorage.js',
    paths.partials + '/templates.js',
    paths.bower + '/bootstrap/js/collapse.js',
    paths.bower + '/bootstrap/js/transition.js',
    paths.js + '/config.js',
    paths.js + '/JcApp.js',
    paths.js + '/*.js',
    paths.js + '/**/*.js'
  ];

  return gulp.src(appJsScripts)
    .pipe(concat("app.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('js-vendor', function () {
  var loggingScripts, uglifyOptions;

  loggingScripts = [
    paths.bower  + '/firebase/firebase.js',
    paths.vendor + '/loggly/loggly-tracker.js',
    paths.vendor + '/stacktrace/stacktrace.js'
  ];

  uglifyOptions = {
    mangle: false
  };

  return gulp.src(loggingScripts)
    .pipe(concat("vendor.js"))
    .pipe(uglify(uglifyOptions))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('js-bottom', function () {
  var bottomScripts = [
    paths.tmp + '/vendor.js',
    paths.tmp + '/app.js'
  ];

  return gulp.src(bottomScripts)
    .pipe(concat("bottom.js"))
    .pipe(gulp.dest(paths.assets));
});
