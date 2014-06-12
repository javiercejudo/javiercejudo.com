var
  gulp = require('gulp'),
  jc = require('../jcConfig'),
  paths = jc.paths;

/**
 * Bumps version according to the given type
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

gulp.task('bump-patch', function () {
  return bumpVersion('patch');
});

gulp.task('bump-minor', function () {
  return bumpVersion('minor');
});

gulp.task('bump-major', function () {
  return bumpVersion('major');
});
