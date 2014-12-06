var
  gulp = require('gulp'),
  manifest = require('gulp-manifest'),
  jc = require('../jcConfig'),
  paths = jc.paths,
  constants = jc.constants;

gulp.task('manifest', function () {
  var files, options, assetsURL, fontsURL, assetsRev = [], revManifest;

  revManifest = require('../rev-manifest.json');
  assetsURL = constants.ASSETS_URL;
  fontsURL = assetsURL + '/' + paths.fonts;

  Object.keys(revManifest).forEach(function(filename) {
    assetsRev.push(assetsURL + '/' + revManifest[filename]);
  });

  options = {
    filename: 'manifest.appcache',
    cache: assetsRev.concat([
      fontsURL + '/glyphicons-halflings-regular.eot',
      fontsURL + '/glyphicons-halflings-regular.svg',
      fontsURL + '/glyphicons-halflings-regular.ttf',
      fontsURL + '/glyphicons-halflings-regular.woff'
    ]),
    network: ['http://*', 'https://*', '*'],
    preferOnline: true,
    timestamp: true,
    hash: false
  };

  files = [
    paths.data + '/min/**/*',
    paths.ico + '/**/*'
  ];

  return gulp.src(files, {base: './'})
    .pipe(manifest(options))
    .pipe(gulp.dest(''));
});
