var
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  htmlmin = require('gulp-htmlmin'),
  ngHtml2Js = require("gulp-ng-html2js"),
  uglify = require('gulp-uglify'),
  jc = require('../jcConfig'),
  paths = jc.paths;

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
