var
  gulp = require('gulp'),
  rev = require('gulp-rev'),
  jc = require('../jcConfig'),
  paths = jc.paths;

gulp.task('rev', function () {
  return gulp.src(paths.assets + '/*.{css,js}')
    .pipe(rev())
    .pipe(gulp.dest(paths.build))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./'));
});
