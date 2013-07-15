module.exports = function(grunt) {
  var jsPath = 'js';
  var cssPath = 'css/stylesheets';
  var bowerPath = 'bower_components';
  var assetsPath = 'assets';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: [
        'Gruntfile.js'
      ],
      options: {
        "globals": {
          "jQuery": true
        }
      }
    },
    
    clean: [
      assetsPath
    ],
    
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'assets/app.js': [
            bowerPath + '/jquery/jquery.js',
            bowerPath + '/angular/angular.js',
            bowerPath + '/bootstrap/bootstrap/js/bootstrap.js',
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
          'css/sass/*.scss'
        ],
        tasks: [
          'compass:dist',
          'csslint:strict',
          'cssmin'
        ],
        options: {
          nospawn: true,
        },
      },
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

  // Default task
  grunt.registerTask('default', ['jshint', 'clean', 'uglify', 'compass:dist', 'csslint:strict', 'cssmin']);
};
