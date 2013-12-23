module.exports = function(karma) {
  'use strict';

  var bowerComponentsPath = 'bower_components';
  var vendorPath = 'vendor';
  var testsPath = 'tests';
  var jsPath = 'js';
  var partialsPath = 'partials';

  karma.set({
    // base path, that will be used to resolve files and exclude
    basePath: '.',

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      bowerComponentsPath +'/html5shiv/dist/html5shiv.js',
      bowerComponentsPath +'/respond/dest/respond.src.js',
      vendorPath +'/firebase/firebase.js',
      bowerComponentsPath + '/modernizr/modernizr.js',
      bowerComponentsPath + '/angular/angular.js',
      bowerComponentsPath + '/angular-route/angular-route.js',
      bowerComponentsPath + '/angular-mocks/angular-mocks.js',
      bowerComponentsPath + '/angular-sanitize/angular-sanitize.js',
      bowerComponentsPath + '/angular-touch/angular-touch.js',
      bowerComponentsPath + '/angular-animate/angular-animate.js',
      bowerComponentsPath + '/angularfire/angularfire.js',
      bowerComponentsPath + '/ngstorage/ngStorage.js',
      partialsPath + '/templates.js',
      jsPath + '/config.js',
      jsPath + '/JcApp.js',
      jsPath + '/AppFilters.js',
      jsPath + '/**/*.js',
//      testsPath +'/unit/**/*Spec.js'
      testsPath +'/unit/**/SecretaryProblemSpec.js'
    ],

    // list of files to exclude
    exclude: [],

    // use dolts reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress', 'junit', 'teamcity'
    // CLI --reporters progress
    reporters: ['progress', 'coverage'],

    // web server port
    // CLI --port 9876
    port: 9876,

    // cli runner port
    // CLI --runner-port 9100
    runnerPort: 9100,

    // enable / disable colors in the output (reporters and logs)
    // CLI --colors --no-colors
    colors: true,

    // level of logging
    // possible values: karma.LOG_DISABLE || karma.LOG_ERROR || karma.LOG_WARN || karma.LOG_INFO || karma.LOG_DEBUG
    // CLI --log-level debug
    logLevel: karma.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    // CLI --auto-watch --no-auto-watch
    autoWatch: true,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    // CLI --browsers Chrome,Firefox,Safari
    browsers: [
      'PhantomJS'
      //'Chrome',
      //'Firefox'
    ],

    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 60000,

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: false,

    // report which specs are slower than [ms]
    // CLI --report-slower-than 500
    reportSlowerThan: 60000,

    // compile coffee scripts
    preprocessors: {
      'js/**/*.js': ['coverage']
    },

    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    },

    plugins: [
      'karma-jasmine',
      'karma-coverage',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ]
  });
};
