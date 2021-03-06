var
  gulp = require('gulp'),
  download = require('gulp-download'),
  rename = require('gulp-rename'),
  jc = require('../jcConfig'),
  paths = jc.paths;

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

gulp.task('download-data', function () {
  return download('https://c3jud0.firebaseio.com/.json?format=export')
    .pipe(rename('c3jud0-export.json'))
    .pipe(gulp.dest(paths.data + '/min'));
});
