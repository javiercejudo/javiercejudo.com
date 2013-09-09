module.exports = function(grunt) {
  var fontsPath = 'fonts';
  var jsPath = 'js';
  var sassPath = 'css/sass';
  var cssPath = 'css/stylesheets';
  var bowerPath = 'bower_components';
  var assetsPath = 'assets';
  var partialsPath = 'partials';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'Gruntfile.js',
        jsPath + '/**/*.js'
      ],
      options: {
        "globals": {
          "jQuery": true
        }
      }
    },

    clean: [
      assetsPath + '/**/*',
      cssPath + '/**/*.css',
      fontsPath + '/**/*'
    ],

    copy: {
      main: {
        files: [{
          expand: true,
          cwd: bowerPath + '/bootstrap/dist/fonts/',
          src: ['**'],
          dest: fontsPath + '/', filter: 'isFile'
        }]
      }
    },

    modernizr: {
      "devFile" : bowerPath + '/modernizr/modernizr.js',
      "outputFile" : bowerPath + '/modernizr/modernizr.custom.js',
      "files": [
        jsPath + '/**/*.js',
        sassPath + '/**/*.scss'
      ],
      "uglify" : false
    },

    html2js: {
      options: {
        base: '.'
      },
      main: {
        src: [partialsPath + '/**/*.html'],
        dest: jsPath + '/templates.js'
      }
    },

    uglify: {
      options: {
        mangle: false
        // sourceMap: function(path) {
        //   return path.replace(/^assets/, '.').replace(/.js$/, '.map');
        // }
      },
      dist: {
        files: {
          'assets/app.js': [
            bowerPath + '/angular-localstorage/localStorageModule.js',
            jsPath + '/JcApp.js',
            jsPath + '/AppFilters.js',
            jsPath + '/**/*.js'
          ],
          'assets/modernizr.js': [
            bowerPath + '/modernizr/modernizr.custom.js'
          ]
        }
      }
    },

    compass: {
      dist: {
        options: {
          sassDir: 'css/sass',
          cssDir: 'css/stylesheets'
        }
      }
    },

    csslint: {
      strict: {
        options: {
          import: 2
        },
        src: [
          cssPath + '**/*.css'
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
            bowerPath + '/bootstrap/dist/css/bootstrap.css',
            cssPath + '/**/*.css'
          ]
        }
      }
    },

    hash: {
      options: {
        mapping: 'assets/assets.map.json'
      },
      assets: 'assets/*.{js,css}'
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
          exclude: [
            assetsPath + '/app.css',
            assetsPath + '/modernizr.js',
            assetsPath + '/app.js'
          ],
          // preferOnline: true,
          verbose: false,
          timestamp: false,
          hash: false,
          master: ['index.php']
        },
        src: [
          // partialsPath + '/**/*.html',
          assetsPath + '/**/*.{css,js}',
          fontsPath + '/**/*'
        ],
        dest: 'cache.manifest'
      }
    },

    watch: {
      sass: {
        files: [
          sassPath + '/**/*.scss'
        ],
        tasks: [
          'compass:dist',
          'csslint:strict'
        ],
        options: {
          nospawn: true
        }
      },
      js: {
        files: [
          'Gruntfile.js',
          jsPath + '/**/*.js'
        ],
        tasks: [
          'jshint:all',
          'modernizr',
          'uglify:dist'
        ],
        options: {
          nospawn: true
        }
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

  // Load plugins used by this task gruntfile
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-hash');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-manifest');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-docular');

  // Default task
  grunt.registerTask('default', [
    'jshint:all',
    'clean',
    'copy',
    'modernizr',
    'compass:dist',
    'csslint:strict',
    'html2js:main',
    'uglify:dist'
  ]);

  // Built assets for production
  grunt.registerTask('build', [
    'default',
    'cssmin:combine',
    'hash',
    'imagemin:dist',
    'manifest:generate'
  ]);

  // Built assets for production and runs tests
  grunt.registerTask('test', [
    'build',
    'karma:dist',
    'karma:e2eLive'
  ]);
};

