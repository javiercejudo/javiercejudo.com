var
  gulp = require('gulp'),
  jc = require('../jcConfig'),
  paths = jc.paths;

gulp.task('copy-fonts', function () {
  return gulp.src(paths.bower + '/bootstrap/dist/fonts/**')
    .pipe(gulp.dest(paths.fonts + '/'));
});
