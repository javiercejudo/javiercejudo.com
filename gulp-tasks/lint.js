var
  gulp = require('gulp'),
  jc = require('../jcConfig'),
  paths = jc.jcConfig.paths;

gulp.task('jshint', function () {
  var
    jshint = require('gulp-jshint'),
    jsHintableScripts = [
      'Gruntfile.js',
      'gulpfile.js',
      paths.js + '/**/*.js',
      paths.tests + '/**/*.js'
    ];

  return gulp.src(jsHintableScripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

gulp.task('csslint', function () {
  var
    csslint = require('gulp-csslint'),
    cssLintableFiles = [
      paths.css + "/jcApp.css"
    ];

  return gulp.src(cssLintableFiles)
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter());
});
