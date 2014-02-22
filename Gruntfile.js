module.exports = function(grunt) {

  // Load plugins used by this task gruntfile
  grunt.loadNpmTasks('grunt-modernizr');
  //grunt.loadNpmTasks('grunt-contrib-compress');
  //grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-karma-coveralls');
  grunt.loadNpmTasks('grunt-docular');

  var fontsPath = 'fonts';
  var jsPath = 'js';
  var cssPath = 'css';
  var bowerPath = 'bower_components';
  var assetsPath = 'assets';
  var dataPath = 'data';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    modernizr: {
      dist: {
        extra : {
          shiv : false,
          printshiv : false,
          load : false,
          mq : false,
          cssclasses : true
        },
        "devFile" : bowerPath + '/modernizr/modernizr.js',
        "outputFile" : bowerPath + '/modernizr/modernizr.custom.js',
        "parseFiles": true,
        "files": [
          [jsPath + '/**/*.js'],
          [cssPath + '/**/*.css']
        ],
        "uglify" : false
      }
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

    coveralls: {
      options: {
        debug: true,
        coverage_dir: 'coverage/'
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

  grunt.registerTask('karma-unit', [
    'karma:dev'
  ]);

  grunt.registerTask('karma-e2e', [
    'karma:e2eDev'
  ]);

  grunt.registerTask('karma-all', [
    'karma-unit',
    'karma-e2e'
  ]);

  grunt.registerTask('default', [
    'karma-unit'
  ]);
};

