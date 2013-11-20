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
      'assets.map.json',
      assetsPath,
      fontsPath,
      minifiedPartialsPath,
      cssPath + '/**/*.css'
    ],

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
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
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
          return '/' + templateName.replace('tmp/', '');
        }
      },
      main: {
        src: [minifiedPartialsPath + '/**/*.html'],
        dest: jsPath + '/templates.js'
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
            bowerPath + '/jquery/jquery.js',
            bowerPath + '/angular/angular.js',
            bowerPath + '/angular-route/angular-route.js',
            bowerPath + '/angular-sanitize/angular-sanitize.js',
            bowerPath + '/angular-touch/angular-touch.js',
            bowerPath + '/angular-animate/angular-animate.js',
            bowerPath + '/angular-fire/angularFire.js',
            bowerPath + '/angular-localstorage/angular-local-storage.js',
            jsPath + '/JcApp.js',
            jsPath + '/AppDirectives.js',
            jsPath + '/AppFilters.js',
            jsPath + '/**/*.js'
          ],
          'assets/top.js': [
            bowerPath + '/html5shiv/dist/html5shiv.js',
            bowerPath + '/respond/respond.src.js'
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
          "css/stylesheets/jcApp.css": "css/less/jcApp.less"
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
        //srcBasePath: assetsPath + '/',
        mapping: 'assets.map.json'
      },
      assets: [
        vendorPath + '/firebase/firebase.js',
        assetsPath + '/*.{js,css}'
      ]
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
            assetsPath + '/app.js',
            assetsPath + '/top.js'
          ],
          preferOnline: false,
          verbose: false,
          timestamp: true,
          hash: true,
          master: ['index.php']
        },
        src: [
          // partialsPath + '/**/*.html',
          assetsPath + '/**/*.{css,js}',
          fontsPath + '/**/*',
          dataPath + '/min/**/*.json'
        ],
        dest: 'manifest.appcache'
      }
    },

    watch: {
      options: {
        nospawn: true
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
          'jshint:all',
          'modernizr',
          'uglify:dist'
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
    'clean',
    'curl',
    'copy',
    'json-minify:dist',
    'less:dist',
    'csslint:strict',
    'htmlmin:dist',
    'html2js:main'
  ]);

  // Built assets for production
  grunt.registerTask('build', [
    'local',
    'modernizr',
    'uglify:dist',
    'cssmin:combine',
    'hash',
    'imagemin:dist',
    'manifest:generate'
  ]);

  // Built assets for production and runs tests
  grunt.registerTask('e2e', [
    'build',
    'karma:e2eDev'
  ]);

  // Built assets for production and runs tests
  grunt.registerTask('default', [
    'build',
    'karma:dev'
  ]);
};

