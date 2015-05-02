var
  gulp = require('gulp'),
  jc = require('../jcConfig'),
  paths = jc.paths,
  isS3Available;

isS3Available = function () {
  return (process.env.S3_KEY !== '' && process.env.S3_SECRET !== '');
};

gulp.task('publish-fonts', function () {
  if (!isS3Available()) {
    return;
  }

  var
    publisher, headers,
    awspublish = require('gulp-awspublish'),
    gzip = require('gulp-gzip'),
    rename = require('gulp-rename');

  publisher = awspublish.create({
    params: {
      Bucket: 'jc-build'
    },
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET
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
  if (!isS3Available()) {
    return;
  }

  var
    publisher, headers,
    awspublish = require('gulp-awspublish'),
    gzip = require('gulp-gzip');

  publisher = awspublish.create({
    params: {
      Bucket: 'jc-build'
    },
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET
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
  if (!isS3Available()) {
    return;
  }

  var
    publisher,
    awspublish = require('gulp-awspublish');

  publisher = awspublish.create({
    params: {
      Bucket: 'jc-wraith-shots'
    },
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET
  });

  return gulp.src(paths.wraith + '/shots/**/*')
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});

gulp.task('publish-backup', ['download-data'], function () {
  if (!isS3Available()) {
    return;
  }

  var
    publisher,
    awspublish = require('gulp-awspublish'),
    rename = require('gulp-rename'),
    date = new Date();

  publisher = awspublish.create({
    params: {
      Bucket: 'jc-firebase'
    },
    accessKeyId: process.env.S3_KEY,
    secretAccessKey: process.env.S3_SECRET
  });

  return gulp.src(paths.data + '/min/c3jud0-export.json')
    .pipe(rename(date.toISOString() + '.json'))
    .pipe(publisher.publish())
    .pipe(awspublish.reporter());
});
