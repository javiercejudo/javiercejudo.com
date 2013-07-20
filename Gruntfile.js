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
      assetsPath + '/*'
    ],
    
    uglify: {
      options: {
        mangle: true
      },
      dist: {
        files: {
          'assets/app.js': [
            bowerPath + '/jquery/jquery.js',
            bowerPath + '/angular/angular.js',
            bowerPath + '/bootstrap/bootstrap/js/bootstrap.js',
            jsPath + '/**/*.js'
          ],
          'assets/html5shiv.js': [
            bowerPath + '/html5shiv/dist/html5shiv.js'
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
          cssPath + '/general.css'
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
            bowerPath + '/bootstrap/bootstrap/css/bootstrap.css',
            bowerPath + '/bootstrap/bootstrap/css/bootstrap-responsive.css',
            cssPath + '/general.css'
          ]
        }
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
        src: assetsPath + '/app.js',
        options: {
          specs: specsPath + '/*Spec.js'
        }
      }
    }
  });

  // Load plugins used by this task gruntfile
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task
  grunt.registerTask('default', ['jshint:all', 'clean', 'uglify:dist', 'jasmine:pivotal', 'compass:dist', 'csslint:strict', 'cssmin:combine']);
};

