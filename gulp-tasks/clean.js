var
  gulp = require('gulp'),
  clean = require('gulp-clean'),
  jc = require('../jcConfig'),
  paths = jc.paths;

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
