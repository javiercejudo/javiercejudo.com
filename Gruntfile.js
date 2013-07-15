module.exports = function(grunt) {
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

    uglify: {
      options: {
        report: 'min',
        preserveComments: false,
        compress: {
          global_defs: {
            DEBUG: false
          }
        }
      }
    }
  });

  // Load plugins used by this task gruntfile
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task
  grunt.registerTask('default', ['jshint', 'uglify']);
};
