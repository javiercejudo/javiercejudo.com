var
  gulp = require('gulp'),
  download = require('gulp-download'),
  rename = require('gulp-rename'),
  jc = require('../jcConfig'),
  paths = jc.jcConfig.paths;

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
