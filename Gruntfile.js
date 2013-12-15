module.exports = function(grunt) {

  // Load plugins used by this task gruntfile
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-curl');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-json-minify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-hash');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-docular');

  var tmpPath = 'tmp';
  var fontsPath = 'fonts';
  var jsPath = 'js';
  var lessPath = 'css/less';
  var cssPath = 'css/stylesheets';
  var bowerPath = 'bower_components';
  var assetsPath = 'assets';
  var partialsPath = 'partials';
  var minifiedPartialsPath = tmpPath + '/partials';
  var dataPath = 'data';
  var vendorPath = 'vendor';
  var testsPath = 'tests';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      options: {
        jshintrc: true
      },
      all: [
        'Gruntfile.js',
        jsPath + '/**/*.js',
        testsPath + '/**/*.js'
      ]
    },

    clean: {
      pre: [
        'assets.map.json',
        assetsPath,
        fontsPath,
        minifiedPartialsPath,
        cssPath + '/**/*.css'
      ],
      post: [
        minifiedPartialsPath
      ],
      assets: [
        assetsPath + '/app.css',
        assetsPath + '/app.js',
        assetsPath + '/top.js'
      ]
    },

    curl: {
      'data/c3jud0-export.json': 'https://c3jud0.firebaseio.com/.json?print=pretty',
      'vendor/firebase/firebase.js': 'https://cdn.firebase.com/v0/firebase.js'
    },

    copy: {
      fonts: {
        files: [{
          expand: true,
          cwd: bowerPath + '/bootstrap/dist/fonts/',
          src: ['**'],
          dest: fontsPath + '/',
          filter: 'isFile'
        }]
      },
      data: {
        files: [{
          expand: true,
          cwd: dataPath + '',
          src: ['*'],
          dest: dataPath + '/min/',
          filter: 'isFile'
        }]
      }
    },

    'json-minify': {
      dist: {
        files: dataPath + '/min/c3jud0-export.json'
      }
    },

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      dist: {
        files: [{
          expand: true,
          dot: false,
          dest: 'tmp',
          src: ['partials/**/*.html']
        }]
      }
    },

    html2js: {
      options: {
        base: '.',
        rename: function (templateName) {
          return templateName.replace('tmp/', '');
        }
      },
      main: {
        src: [minifiedPartialsPath + '/**/*.html'],
        dest: partialsPath + '/templates.js'
      }
    },

    modernizr: {
      extra : {
        shiv : false,
        printshiv : false,
        load : false,
        mq : false,
        cssclasses : true
      },
      "devFile" : bowerPath + '/modernizr/modernizr.js',
      "outputFile" : bowerPath + '/modernizr/modernizr.custom.js',
      "files": [
        jsPath + '/**/*.js',
        cssPath + '/**/*.css'
      ],
      "uglify" : false
    },

    uglify: {
      options: {
        mangle: true
        // sourceMap: function(path) {
        //   return path.replace(/^assets/, '.').replace(/.js$/, '.map');
        // }
      },
      dist: {
        files: {
          'assets/app.js': [
            bowerPath + '/modernizr/modernizr.custom.js',
            bowerPath + '/angular/angular.js',
            bowerPath + '/angular-route/angular-route.js',
            bowerPath + '/angular-sanitize/angular-sanitize.js',
            bowerPath + '/angular-touch/angular-touch.js',
            bowerPath + '/angular-animate/angular-animate.js',
            bowerPath + '/angularfire/angularfire.js',
            bowerPath + '/ngstorage/ngStorage.js',
            partialsPath + '/templates.js',
            jsPath + '/config.js',
            jsPath + '/JcApp.js',
            jsPath + '/AppDirectives.js',
            jsPath + '/AppFilters.js',
            jsPath + '/**/*.js'
          ],
          'assets/top.js': [
            bowerPath + '/html5shiv/dist/html5shiv.js',
            bowerPath + '/respond/dest/respond.src.js'
          ]
        }
      }
    },

    less: {
      dist: {
        options: {
          dumpLineNumbers: "comments"
        },
        files: {
          "css/stylesheets/custom-bootstrap.css": "css/less/custom-bootstrap.less",
          "css/stylesheets/jcApp.css": "css/less/jcApp.less"
        }
      }
    },

    csslint: {
      options: {
        csslintrc: ".csslintrc"
      },
      strict: {
        src: [
          cssPath + '/**/*.css',
          '!' + cssPath + '/custom-bootstrap.css'
        ]
      }
    },

    cssmin: {
      combine: {
        options: {
          keepSpecialComments: 0
        },
        files: {
          'assets/app.css': [
//            bowerPath + '/bootstrap/dist/css/bootstrap.css',
            cssPath + '/**/*.css'
          ]
        }
      }
    },

    hash: {
      options: {
        mapping: 'assets.map.json',
        hashLength: 8,
        flatten: true
      },
      assets: [
        vendorPath + '/firebase/firebase.js',
        assetsPath + '/*.{js,css}'
      ]
    },

    compress: {
      main: {
        options: {
          mode: 'gzip'
        },
        expand: true,
        cwd: 'assets/',
        src: ['**/*'],
        dest: 'assets/'
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 3
        },
        files: [
          {
            expand: true,
            cwd: 'img/',
            src: ['**/*'],
            dest: 'img/'
          }
        ]
      }
    },

    manifest: {
      generate: {
        options: {
          basePath: '.',
          // cache: ['js/app.js', 'css/style.css'],
          // network: ['http://*', 'https://*'],
          // fallback: ['/ /offline.html'],
          preferOnline: false,
          verbose: false,
          timestamp: true,
          hash: true, // does not seem to work
          master: ['index.php']
        },
        src: [
          // partialsPath + '/**/*.html',
          assetsPath + '/**/*.{css,js,gz}',
          fontsPath + '/**/*',
          dataPath + '/min/**/*.json'
        ],
        dest: 'manifest.appcache'
      }
    },

    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      less: {
        files: [
          lessPath + '/**/*.less'
        ],
        tasks: [
          'less:dist',
          'csslint:strict'
        ]
      },
      js: {
        files: [
          'Gruntfile.js',
          jsPath + '/**/*.js'
        ],
        tasks: [
          'jshint:all'
        ]
      },
      partials: {
        files: [
          partialsPath + '/**/*.html'
        ],
        tasks: [
          'htmlmin:dist',
          'html2js:main'
        ]
      }
    },

    karma: {
      options: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      dev: {
        browsers: ['PhantomJS']
      },
      dist: {
        browsers: ['Chrome', 'Firefox']
      },
      // e2e tests have their own config file
      // so we need to overwrite the general one
      e2eDev: {
        configFile: 'karma-e2e.conf.js',
        browsers: ['PhantomJS']
      },
      e2eLive: {
        configFile: 'karma-e2e.conf.js',
        browsers: ['Chrome', 'Firefox']
      }
    },

    docular: {
      groups: [
        {
          groupTitle: 'javiercejudo.com',
          groupId: 'javiercejudo',
          groupIcon: 'icon-bolt',
          showSource: true,
          sections: [
            {
              id: "api",
              title: "JavierCejudo.com API",
              showSource: true,
              scripts: [
                  "js/JcApp.js"
              ],
              rank: {
                'JcApp':1
              }
            }
          ]
        }
      ],
      showDocularDocs: true,
      showAngularDocs: true
    }
  });

  // Default task
  grunt.registerTask('local', [
    'jshint:all',
    'clean:pre',
    'curl',
    'copy',
    'json-minify:dist',
    'less:dist',
    'csslint:strict',
    'htmlmin:dist',
    'html2js:main',
    'clean:post'
  ]);

  // Built assets for production
  grunt.registerTask('build', [
    'local',
    'modernizr',
    'uglify:dist',
    'cssmin:combine',
    'hash',
    'clean:assets',
    //'compress:main',
    'imagemin:dist',
    'manifest:generate'
  ]);

  // Builds assets for production and runs e2e tests
  grunt.registerTask('e2e', [
    'build',
    'karma:dev'
  ]);

  // Runs all tests
  grunt.registerTask('test-only', [
    'karma:dev',
    'karma:e2eDev'
  ]);

  // Builds assets for production and runs all tests
  grunt.registerTask('test', [
    'build',
    'karma:dev',
    'karma:e2eDev'
  ]);

  // Builds assets for production and runs unit tests
  grunt.registerTask('default', [
    'build',
    'karma:dev'
  ]);
};

