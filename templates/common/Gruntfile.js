'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').
    filterDev('grunt-*').
    concat(['gruntacular']).
    forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    yeoman: {
      app: 'app',
      dist: 'dist'
    },
    watch: {
      compass: {
        files: ['app/styles/**/*.{scss,sass}'],
        tasks: ['compass']
      },
      haml: {
        files: ['app{/,/views/}*.haml'],
        tasks: ['haml:server']
      },
      livereload: {
        files: [
          '{.tmp,app}{/,/views/}*.html',
          '{.tmp,app}/styles/**/*.css',
          'app/scripts/**/*.js',
          'app/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ],
        tasks: ['livereload']
      }
    },
    connect: {
      livereload: {
        options: {
          port: 9000,
          // Change this to '0.0.0.0' to access the server from outside.
          hostname: 'localhost',
          middleware: function (connect) {
            return [
              lrSnippet,
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'app')
            ];
          }
        }
      },
      test: {
        options: {
          port: 9005,
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      }
    },
    open: {
      server: {
        url: 'http://localhost:<%%= connect.livereload.options.port %>'
      }
    },
    clean: {
      dist: ['.tmp', 'dist/*'],
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'app/scripts/**/*.js'
      ]
    },
    testacular: {
      unit: {
        configFile: 'testacular.conf.js',
        singleRun: true
      }
    },
    compass: {
      options: {
        sassDir: 'app/styles',
        cssDir: '.tmp/styles',
        imagesDir: 'app/images',
        javascriptsDir: 'app/scripts',
        fontsDir: 'app/styles/fonts',
        importPath: 'app/components',
        relativeAssets: true
      },
      dist: {
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    ngtemplates: {
      // FIXME This target name must be the name of the angular module
      // What a terrible way to configure this :-\
      <%= _.camelize(appname) %>App: {
        options: {
          base: '.tmp/app'
        },
        src: [ '.tmp/app/views/*.html' ],
        dest: '.tmp/app/templates.js'
      }
    },
    useminPrepare: {
      html: '.tmp/app/index.html',
      options: {
        dest: 'dist'
      }
    },
    usemin: {
      html: ['.tmp/app/index.html'],
      css: ['dist/styles/{,*/}*.css'],
      options: {
        dirs: ['dist']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'dist/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            'app/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          removeCommentsFromCDATA: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: false,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/haml',
          src: ['app/{,views/}*.html'],
          dest: '.tmp'
        }]
      }
    },
    haml: {
      dist : {
        options: {
          language: 'ruby'
        },
        files: [{
          expand: true,
          src: ['app/**/*.haml'],
          dest: '.tmp/haml/',
          ext: '.html'
        }]
      },
      server : {
        options: {
          language: 'ruby'
        },
        files: [{
          cwd: 'app',
          expand: true,
          src: ['**/*.haml'],
          dest: '.tmp',
          ext: '.html'
        }]
      }
    },
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dist/scripts',
          src: '*.js',
          dest: 'dist/scripts'
        }]
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/scripts/scripts.js': [
            'dist/scripts/scripts.js'
          ],
        }
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: 'dist',
          src: [
            '*.{ico,txt}',
            '.htaccess',
            'font/*'
          ]
        }]
      }, tmp: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: '.tmp/app',
          src: [
            'scripts/**/*',
            'components/**/*'
          ]
        }]
      }, postUsemin: {
        files: [{
          expand: true,
          dot: true,
          cwd: '.tmp/app',
          dest: 'dist',
          src: [ 'index.html' ]
        }]
      }
    }
  });

  grunt.renameTask('regarde', 'watch');
  // remove when mincss task is renamed
  grunt.renameTask('mincss', 'cssmin');

  grunt.registerTask('ngtemplatesDummy', function() {
    var fs = require('fs');
    fs.writeFileSync('.tmp/templates.js', '/* No templates in dev version */');
  });

  grunt.registerTask('server', [
    'clean:server',
    'haml:server', // Weirdly, this crashes if it's right before livereload...
    'compass:server',
    'ngtemplatesDummy',
    'livereload-start',
    'connect:livereload',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'jshint',
    'compass',
    'connect:test',
    'testacular'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'copy:tmp',
    'test',
    'haml:dist',
    'htmlmin',
    'ngtemplates',
    'useminPrepare',
    'compass:dist',
    'copy:dist',
    'imagemin',
    'cssmin',
    'concat',
    'usemin',
    'copy:postUsemin',
    'ngmin',
    'uglify:dist'
  ]);

  grunt.registerTask('default', ['build']);
};
