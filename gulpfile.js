var
  gulp = require('gulp'),
  gutil = require('gulp-util'),
  clean = require('gulp-clean'),
  csslint = require('gulp-csslint'),
  cssmin = require('gulp-cssmin'),
  concat = require('gulp-concat'),
  download = require('gulp-download'),
  htmlmin = require('gulp-htmlmin'),
  jshint = require('gulp-jshint'),
  less = require('gulp-less'),
  manifest = require('gulp-manifest'),
  ngHtml2Js = require("gulp-ng-html2js"),
  notify = require('gulp-notify'),
  rename = require('gulp-rename'),
  rev = require('gulp-rev'),
  runSequence = require('run-sequence'),
  uglify = require('gulp-uglify'),
  uncss = require('gulp-uncss'),
  env = process.env,
  paths = {
    assets: 'assets',
    build: 'build',
    bower: 'bower_components',
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

/**
 * Downloads a file to an given vendor folder
 *
 * @param {String} url      URL to download the file from
 * @param {String} filename Name to give the downloaded file
 * @param {String} dest     Destination foler
 *
 * @returns {Object}
 */
var downloadVendorLib = function (url, filename, dest) {
  return download(url)
    .pipe(rename(filename))
    .pipe(gulp.dest(paths.vendor + '/' + dest));
};

/**
 * Downloads a file to an given vendor folder and optionally creates a build file for it
 *
 * @param {String} type Version to bump (major|minor|patch|prerelease)
 *
 * @returns {Object}
 */
var bumpVersion = function (type) {
  var
    bump = require('gulp-bump'),
    options = {
      type: type
    };

  return gulp.src(['./package.json', './bower.json', './manifest.json'])
    .pipe(bump(options))
    .pipe(gulp.dest('./'));
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
    'loggly'
  );
});

gulp.task('download-stacktrace', function () {
  return downloadVendorLib(
    'https://raw.github.com/stacktracejs/stacktrace.js/master/stacktrace.js',
    'stacktrace.js',
    'stacktrace'
  );
});

gulp.task('download-data', function () {
  return download('https://c3jud0.firebaseio.com/.json')
    .pipe(rename('c3jud0-export.json'))
    .pipe(gulp.dest(paths.data + '/min'));
});

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

gulp.task('less', function () {
  var lessFiles, lessOptions;

  lessFiles = [
    paths.css + "/less/custom-bootstrap.less",
    paths.css + "/less/jcApp.less"
  ];

  lessOptions = {
    sourceMap: true,
    dumpLineNumbers: "comments"
  };

  return gulp.src(lessFiles)
    .pipe(less(lessOptions))
    .pipe(gulp.dest(paths.css));
});

gulp.task('css-concat', ['uncss'], function () {
  var cssminOptions = {
    keepSpecialComments: 0
  };

  return gulp.src(paths.css + '/**/*.css')
    .pipe(concat('app.css'))
    .pipe(cssmin(cssminOptions))
    .pipe(gulp.dest(paths.assets));
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

gulp.task('rev', function () {
  return gulp.src(paths.assets + '/*.{css,js}')
    .pipe(rev())
    .pipe(gulp.dest(paths.build))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./'));
});

gulp.task('manifest', function () {
  var files, options, assetsURL, fontsURL, assetsRev = [], revManifest;

  revManifest = require('./rev-manifest.json');
  assetsURL = 'http://static.javiercejudo.com';
  fontsURL = assetsURL + '/' + paths.fonts;

  Object.keys(revManifest).forEach(function(filename) {
    assetsRev.push(assetsURL + '/' +revManifest[filename]);
  });

  options = {
    filename: 'manifest.appcache',
    cache: assetsRev.concat([
      fontsURL + '/glyphicons-halflings-regular.eot',
      fontsURL + '/glyphicons-halflings-regular.svg',
      fontsURL + '/glyphicons-halflings-regular.ttf',
      fontsURL + '/glyphicons-halflings-regular.woff'
    ]),
    network: ['http://*', 'https://*', '*'],
    preferOnline: true,
    timestamp: true,
    hash: false
  };

  files = [
    paths.data + '/min/**/*',
    paths.ico + '/**/*'
  ];

  return gulp.src(files, {base: './'})
    .pipe(manifest(options))
    .pipe(gulp.dest(''));
});

gulp.task('uncss-pre', function () {
  return gulp.src([paths.partials + '/**/*.html', paths.layout + '/**/*.php'])
    .pipe(concat('all.html'))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('uncss', ['uncss-pre'], function () {
  return gulp.src(paths.css + '/custom-bootstrap.css')
    .pipe(uncss({
        html: [
          paths.tmp + '/all.html'
        ],
        ignore: [
          /\.alert/,
          /\.active/, /\.disabled/,
          /\.fade/, /\.collapse/, /\.collapsing/,
          /glyphicon.*/,
          /print.*/,
        ]
    }))
    .pipe(gulp.dest(paths.css));
});

gulp.task('publish-fonts', function () {
  var
    publisher, headers,
    awspublish = require('gulp-awspublish'),
    gzip = require('gulp-gzip');

  publisher = awspublish.create({
    key: env.S3_KEY,
    secret: env.S3_SECRET,
    bucket: 'jc-build'
  });

  headers = {
   'Cache-Control': 'max-age=604800, no-transform, public',
   'Content-Encoding': 'gzip'
  };

  return gulp.src(paths.fonts + '/**/*.{eot,svg,ttf,woff}')
    .pipe(gzip({ append: false }))
    .pipe(rename(function (path) {
        path.dirname += '/' + paths.fonts;
    }))
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});

gulp.task('publish-build', ['publish-fonts'], function () {
  var
    publisher, headers,
    awspublish = require('gulp-awspublish'),
    gzip = require('gulp-gzip');

  publisher = awspublish.create({
    key: env.S3_KEY,
    secret: env.S3_SECRET,
    bucket: 'jc-build'
  });

  headers = {
   'Cache-Control': 'max-age=31536000, no-transform, public',
   'Content-Encoding': 'gzip'
  };

  return gulp.src(paths.build + '/**/*.{css,js}')
    .pipe(gzip({ append: false }))
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});

gulp.task('publish-wraith', function () {
  var
    publisher,
    awspublish = require('gulp-awspublish');

  publisher = awspublish.create({
    key: env.S3_KEY,
    secret: env.S3_SECRET,
    bucket: 'jc-wraith-shots'
  });

  return gulp.src(paths.wraith + '/shots/**/*')
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});

gulp.task('bump-patch', function () {
  return bumpVersion('patch');
});

gulp.task('bump-minor', function () {
  return bumpVersion('minor');
});

gulp.task('bump-major', function () {
  return bumpVersion('major');
});

gulp.task('coveralls', function () {
  var coveralls = require('gulp-coveralls');

  return gulp.src('coverage/**/lcov.info')
    .pipe(coveralls());
});

gulp.task('default', function () {
  runSequence(
    ['jshint', 'clean-pre', 'download-data'],
    ['copy-fonts', 'download-loggly-tracker', 'download-stacktrace', 'partials'],
    ['less', 'js-top', 'js-app', 'js-vendor'],
    ['css-concat', 'js-bottom'],
    ['rev'],
    ['manifest', 'csslint']
  );
});

gulp.task('offline', function () {
  runSequence(
    ['jshint', 'clean-build'],
    ['partials'],
    ['less', 'js-top', 'js-app', 'js-vendor'],
    ['css-concat', 'js-bottom'],
    ['rev'],
    ['manifest', 'csslint']
  );
});
