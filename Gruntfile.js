module.exports = function(grunt) {
  var jsPath = 'js';
  var sassPath = 'css/sass';
  var cssPath = 'css/stylesheets';
  var bowerPath = 'bower_components';
  var assetsPath = 'assets';
  var specsPath = 'tests/js';

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
      cssPath + '/**/*.css'
    ],
    
    modernizr: {
      "devFile" : bowerPath + '/modernizr/modernizr.js',
      "outputFile" : bowerPath + '/modernizr/modernizr.custom.js',
      "files": [
        jsPath + '/**/*.js',
        sassPath + '/**/*.scss'
      ],
      "uglify" : false
    },
    
    uglify: {
      options: {
        mangle: true
      },
      dist: {
        files: {
          'assets/app.js': [
            //bowerPath + '/jquery/jquery.js',
            bowerPath + '/angular/angular.js',
            bowerPath + '/angular-sanitize/angular-sanitize.js',
            //bowerPath + '/bootstrap/dist/js/bootstrap.js',
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
          cssDir: 'css/stylesheets',
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
    
    watch: {
      sass: {
        files: [
          sassPath + '/**/*.scss'
        ],
        tasks: [
          'compass:dist',
          'csslint:strict',
          'cssmin:combine'
        ],
        options: {
          nospawn: true,
        },
      },
      js: {
        files: [
          'Gruntfile.js',
          jsPath + '/**/*.js'
        ],
        tasks: [
          'jshint:all',
          'uglify:dist',
          'jasmine:pivotal'
        ],
        options: {
          nospawn: true,
        },
      }
    },
    
    jasmine: {
      pivotal: {
        src: [
          assetsPath + '/app.js',
          'bower_components/angular/angular.js',
          'bower_components/angular-mocks/angular-mocks.js',
        ],
        options: {
          specs: specsPath + '/**/*Spec.js'
        }
      }
    },
    
    docular: {
      groups: [
        {
          groupTitle: 'javiercejudo.com',
          groupId: 'javiercejudo',
          groupIcon: 'icon-rocket',
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
      showAngularDocs: false
    }
  });

  // Load plugins used by this task gruntfile
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-docular');

  // Default task
  grunt.registerTask('default', [
    'jshint:all',
    'clean',
    'modernizr',
    'compass:dist',
    'csslint:strict',
  ]);
  
  // Built assets for production
  grunt.registerTask('build', [
    'jshint:all',
    'clean',
    'modernizr',
    'uglify:dist',
    'jasmine:pivotal',
    'compass:dist',
    'csslint:strict',
    'cssmin:combine'
  ]);
};

