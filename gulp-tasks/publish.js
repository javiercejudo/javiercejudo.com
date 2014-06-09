var
  gulp = require('gulp'),
  jc = require('../jcConfig'),
  paths = jc.jcConfig.paths;

gulp.task('publish-fonts', function () {
  var
    publisher, headers,
    awspublish = require('gulp-awspublish'),
    gzip = require('gulp-gzip'),
    rename = require('gulp-rename');

  publisher = awspublish.create({
    key: process.env.S3_KEY,
    secret: process.env.S3_SECRET,
    bucket: 'jc-build'
  });

  headers = {
   'Cache-Control': 'max-age=604800, no-transform, public',
   'Content-Encoding': 'gzip'
  };

  return gulp.src(paths.fonts + '/**/*.{eot,svg,ttf,woff}')
    .pipe(gzip({ append: false }))
    .pipe(rename(function (path) {
        path.dirname += '/' + paths.fonts;
    }))
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});

gulp.task('publish-build', ['publish-fonts'], function () {
  var
    publisher, headers,
    awspublish = require('gulp-awspublish'),
    gzip = require('gulp-gzip');

  publisher = awspublish.create({
    key: process.env.S3_KEY,
    secret: process.env.S3_SECRET,
    bucket: 'jc-build'
  });

  headers = {
   'Cache-Control': 'max-age=31536000, no-transform, public',
   'Content-Encoding': 'gzip'
  };

  return gulp.src(paths.build + '/**/*.{css,js}')
    .pipe(gzip({ append: false }))
    .pipe(publisher.publish(headers))
    .pipe(awspublish.reporter());
});

gulp.task('publish-wraith', function () {
  var
    publisher,
    awspublish = require('gulp-awspublish');

  publisher = awspublish.create({
    key: process.env.S3_KEY,
    secret: process.env.S3_SECRET,
    bucket: 'jc-wraith-shots'
  });

  return gulp.src(paths.wraith + '/shots/**/*')
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});
