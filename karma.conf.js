/*global process */

module.exports = function(karma) {
  'use strict';

  var
    env = process.env,
    paths;

  paths = {
    bowerComponents: 'bower_components',
    vendor: 'vendor',
    tests: 'tests',
    js: 'js',
    partials: 'partials'
  };

  karma.set({
    // base path, that will be used to resolve files and exclude
    basePath: '.',

    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      paths.bowerComponents + '/firebase/firebase.js',
      paths.bowerComponents + '/jquery/dist/jquery.js',
      paths.bowerComponents + '/angular/angular.js',
      paths.bowerComponents + '/angular-route/angular-route.js',
      paths.bowerComponents + '/angular-mocks/angular-mocks.js',
      paths.bowerComponents + '/angular-sanitize/angular-sanitize.js',
      paths.bowerComponents + '/angular-touch/angular-touch.js',
      paths.bowerComponents + '/angular-animate/angular-animate.js',
      paths.bowerComponents + '/angularfire/angularfire.js',
      paths.bowerComponents + '/ngstorage/ngStorage.js',
      paths.partials + '/templates.js',
      paths.js + '/config.js',
      paths.js + '/JcApp.js',
      paths.js + '/AppFilters.js',
      paths.js + '/**/*.js',
      paths.tests +'/unit/**/*Spec.js'
    ],

    // list of files to exclude
    exclude: [],

    // use dolts reporter, as travis terminal does not support escaping sequences
    // possible values: 'dots', 'progress', 'junit', 'teamcity'
    // CLI --reporters progress
    reporters: ['progress', 'coverage', 'saucelabs'],

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

    sauceLabs: {
      username: env.SAUCE_USERNAME,
      accessKey: env.SAUCE_ACCESS_KEY,
      build: env.TRAVIS_BUILD_NUMBER,
      tunnelIdentifier: env.TRAVIS_JOB_NUMBER,
      startConnect: true,
      testName: 'javiercejudo.com: unit tests'
    },

    customLaunchers: {
      'SL_Chrome': {
        base: 'SauceLabs',
        browserName: 'chrome'
      },
      'SL_Firefox': {
        base: 'SauceLabs',
        browserName: 'firefox'
      },
      'SL_Safari': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.9'
      },
      'SL_IE_9': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2008',
        version: '9'
      },
      'SL_IE_10': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2012',
        version: '10'
      },
      'SL_IE_11': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
      },
      'SL_Opera': {
        base: 'SauceLabs',
        browserName: 'opera'
      },
      'SL_Android': {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
      },
      'SL_iOS': {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'OS X 10.9'
      },
    },

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
      'SL_Chrome',
      'SL_Firefox',
      'SL_Safari',
      'SL_IE_11'
    ],

    // If browser does not capture in given timeout [ms], kill it
    // CLI --capture-timeout 5000
    captureTimeout: 120000,

    // Auto run tests on start (when browsers are captured) and exit
    // CLI --single-run --no-single-run
    singleRun: true,

    // report which specs are slower than [ms]
    // CLI --report-slower-than 500
    reportSlowerThan: 0,

    // How long to wait for a message from a browser before disconnecting it (in ms)
    browserNoActivityTimeout: 300000,

    // compile coffee scripts
    preprocessors: {
      'js/**/!(JcApp|config).js': ['coverage']
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
      'karma-firefox-launcher',
      'karma-sauce-launcher'
    ]
  });
};
