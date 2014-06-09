var
  gulp = require('gulp'),
  jc = require('../jcConfig'),
  paths = jc.jcConfig.paths;

gulp.task('coveralls', function () {
  var coveralls = require('gulp-coveralls');

  return gulp.src('coverage/**/lcov.info')
    .pipe(coveralls());
});
