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
    paths.npm + '/angular/angular.js',
    paths.npm + '/angular-route/angular-route.js',
    paths.npm + '/angular-sanitize/angular-sanitize.js',
    paths.npm + '/angular-touch/angular-touch.js',
    paths.npm + '/angular-animate/angular-animate.js',
    paths.bower + '/angularfire/dist/angularfire.js',
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
  var vendorScripts, uglifyOptions;

  vendorScripts = [
    paths.bower  + '/firebase/firebase.js'
  ];

  uglifyOptions = {
    mangle: false
  };

  return gulp.src(vendorScripts)
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
