var
  requireDir = require('require-dir'),
  gulp = require('gulp'),
  runSequence = require('run-sequence');

requireDir('./gulp-tasks');

gulp.task('default', function () {
  runSequence(
    ['jshint', 'clean-pre', 'download-data'],
    ['copy-fonts', 'partials'],
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
