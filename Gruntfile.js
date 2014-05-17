module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-docular');

  var jsPath = 'js';
  var cssPath = 'css';
  var bowerPath = 'bower_components';
  var imgPath = 'img';

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
        "files": {
            "src": [
              jsPath + '/**/*.js',
              cssPath + '/**/*.css'
            ]
        },
        "uglify" : false
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
        browsers: [
          process.env.BROWSER
        ]
      },
      // e2e tests have their own config file
      // so we need to overwrite the general one
      e2eDev: {
        configFile: 'karma-e2e.conf.js',
        browsers: ['PhantomJS']
      },
      e2eDist: {
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

  grunt.registerTask('karma-dev-all', [
    'karma:dev',
    'karma:e2eDev'
  ]);

  grunt.registerTask('karma-dist-all', [
    'karma:dist',
    'karma:e2eDist'
  ]);

  grunt.registerTask('default', [
    'karma:dist1',
    'karma:dist2',
    'karma:dist3'
  ]);
};

