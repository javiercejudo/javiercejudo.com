var
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  cssmin = require('gulp-cssmin'),
  less = require('gulp-less'),
  uncss = require('gulp-uncss'),
  jc = require('../jcConfig'),
  paths = jc.paths;

gulp.task('less', function () {
  var lessFiles, lessOptions;

  lessFiles = [
    paths.css + "/less/custom-bootstrap.less",
    paths.css + "/less/jcApp.less"
  ];

  lessOptions = {
    sourceMap: true,
    dumpLineNumbers: "comments"
  };

  return gulp.src(lessFiles)
    .pipe(less(lessOptions))
    .pipe(gulp.dest(paths.css));
});


gulp.task('uncss-pre', function () {
  return gulp.src([paths.partials + '/**/*.html', paths.layout + '/**/*.php'])
    .pipe(concat('all.html'))
    .pipe(gulp.dest(paths.tmp));
});

gulp.task('uncss', ['uncss-pre'], function () {
  return gulp.src(paths.css + '/custom-bootstrap.css')
    .pipe(uncss({
        html: [paths.tmp + '/all.html'],
        ignore: [
          /\.alert/,
          /\.active/, /\.disabled/,
          /\.fade/, /\.collapse/, /\.collapsing/,
          /glyphicon.*/,
          /print.*/,
        ]
    }))
    .pipe(gulp.dest(paths.css));
});

gulp.task('css-concat', ['uncss'], function () {
  var cssminOptions = {
    keepSpecialComments: 0
  };

  return gulp.src(paths.css + '/**/*.css')
    .pipe(concat('app.css'))
    .pipe(cssmin(cssminOptions))
    .pipe(gulp.dest(paths.assets));
});
