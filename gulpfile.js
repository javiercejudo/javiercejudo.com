var
  gulp = require('gulp'),
//  gutil = require('gulp-util'),
  clean = require('gulp-clean'),
  csslint = require('gulp-csslint'),
  cssmin = require('gulp-cssmin'),
  concat = require('gulp-concat'),
  download = require('gulp-download'),
  htmlmin = require('gulp-htmlmin'),
  jshint = require('gulp-jshint'),
  karma = require('gulp-karma'),
  less = require('gulp-less'),
  manifest = require('gulp-manifest'),
  ngHtml2Js = require("gulp-ng-html2js"),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  rev = require('gulp-rev'),
  runSequence = require('run-sequence'),
  uglify = require('gulp-uglify');

var paths = {
  build: 'build',
  bower: 'bower_components',
  css: 'css',
  data: 'data',
  fonts: 'fonts',
  js: 'js',
  tmp: 'tmp',
  partials: 'partials',
  tests: 'tests',
  vendor: 'vendor'
};

/**
 * Downloads a file to an given vendor folder and optionally creates a build file for it
 *
 * @param url      string URL to download the file from
 * @param filename string Name to give the downloaded file
 * @param dest     string Destination foler
 * @param build    bool   True to create a build file
 *
 * @returns {Object}
 */
var downloadVendorLib = function (url, filename, dest, build) {
  var downloadStream = download(url)
    .pipe(rename(filename))
    .pipe(gulp.dest(paths.vendor + '/' + dest));

  if (!build) {
    return downloadStream;
  }

  return downloadStream
    .pipe(rev())
    .pipe(gulp.dest(paths.build));
};

gulp.task('jshint', function () {
  var jsHintableScripts = [
    'Gruntfile.js',
    'gulpfile.js',
    paths.js + '/**/*.js',
    paths.tests + '/**/*.js'
  ];

  return gulp.src(jsHintableScripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('clean-pre', function () {
  var pathsToClean = [
    paths.build + '/**/*',
    paths.vendor + '/**/*',
    paths.tmp + '/**/*',
    paths.fonts + '/**/*',
    paths.css + '/**/*.css'
  ];

  return gulp.src(pathsToClean, {read: false})
    .pipe(clean());
});

gulp.task('clean-build', function () {
  var pathsToClean = [
    paths.build + '/**/*'
  ];

  return gulp.src(pathsToClean, {read: false})
    .pipe(clean());
});

gulp.task('copy-fonts', function () {
  return gulp.src(paths.bower + '/bootstrap/dist/fonts/**')
    .pipe(gulp.dest(paths.fonts + '/'));
});

gulp.task('download-loggly-tracker', function () {
  return downloadVendorLib(
    'https://raw.github.com/loggly/loggly-jslogger/master/src/loggly.tracker.js',
    'loggly-tracker.js',
    'loggly',
    false
  );
});

gulp.task('download-stacktrace', function () {
  return downloadVendorLib(
    'https://raw.github.com/stacktracejs/stacktrace.js/master/stacktrace.js',
    'stacktrace.js',
    'stacktrace',
    false
  );
});

gulp.task('download-data', function () {
  return download('https://c3jud0.firebaseio.com/.json')
    .pipe(rename('c3jud0-export.json'))
    .pipe(gulp.dest(paths.data + '/min'));
});

gulp.task('js-top', function () {
  var topJsScripts = [
    paths.bower + '/html5shiv/dist/html5shiv.js',
    paths.bower + '/respond/dest/respond.src.js'
  ];

  return gulp.src(topJsScripts)
    .pipe(concat("top.js"))
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(paths.build));
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
    .pipe(rev())
    .pipe(gulp.dest(paths.build));
});

gulp.task('less', function () {
  var cssFiles, lessOptions, cssminOptions;

  cssFiles = [
    paths.css + "/less/custom-bootstrap.less",
    paths.css + "/less/jcApp.less"
  ];

  lessOptions = {
    //paths: cssFiles,
    dumpLineNumbers: "comments"
  };

  cssminOptions = {
    keepSpecialComments: 0
  };

  return gulp.src(cssFiles)
    .pipe(less(lessOptions))
    .pipe(gulp.dest(paths.css))
    .pipe(concat('app.css'))
    .pipe(cssmin(cssminOptions))
    .pipe(rev())
    .pipe(gulp.dest(paths.build));
});

gulp.task('csslint', function () {
  var cssLintableFiles = [
    paths.css + "/jcApp.css"
  ];

  return gulp.src(cssLintableFiles)
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter());
});

gulp.task('partials', function () {
  var hmltminOptions, ngHtml2JsOptions;

  hmltminOptions = {
    removeComments: true,
    collapseWhitespace: true
  };

  ngHtml2JsOptions = {
    moduleName: "templates-main",
    prefix: 'partials/'
  };

  return gulp.src(paths.partials + '/**/*.html')
    .pipe(htmlmin(hmltminOptions))
    .pipe(ngHtml2Js(ngHtml2JsOptions))
    .pipe(concat("templates.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.partials));
});

gulp.task('manifest', function () {
  var files, options;

  files = [
    paths.build + '/**/*',
    paths.fonts + '/**/*',
    paths.data + '/min/**/*'
  ];

  options = {
    filename: 'manifest.appcache',
    network: ['http://*', 'https://*', '*'],
    preferOnline: true,
    timestamp: true,
    hash: false
  };

  return gulp.src(files, {base: './'})
    .pipe(manifest(options))
    .pipe(gulp.dest(''));
});

gulp.task('styles', function (cb) {
  runSequence(
    'less',
    'csslint'
  );
});

gulp.task('scripts', function () {
  runSequence(
    ['download-loggly-tracker', 'download-stacktrace', 'partials'],
    ['js-app', 'js-top']
  );
});

gulp.task('build', function () {
  runSequence(
    ['copy-fonts', 'styles', 'scripts'],
    'manifest'
  );
});

gulp.task('default', function () {
  runSequence(
    ['jshint', 'clean-pre', 'download-data'],
    ['copy-fonts', 'download-loggly-tracker', 'download-stacktrace', 'partials'],
    ['less', 'js-top', 'js-app', 'js-vendor'],
    ['js-bottom'],
    ['csslint', 'manifest']
  );
});

gulp.task('offline', function () {
  runSequence(
    ['jshint', 'clean-build'],
    ['partials'],
    ['less', 'js-top', 'js-app', 'js-vendor'],
    ['js-bottom'],
    ['csslint', 'manifest']
  );
});
