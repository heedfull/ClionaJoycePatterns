module.exports = function (grunt) {
  'use strict';
  var path = require('path');

  function paths() {
    return require('./patternlab-config.json').paths;
  }

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        banner: '/* \n * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy") %> \n * \n * <%= pkg.author %>, and the web community.\n * Licensed under the <%= pkg.license %> license. \n * \n * Many thanks to Brad Frost and Dave Olsen for inspiration, encouragement, and advice. \n *\n */\n\n'
      },
      patternlab: {
        src: './core/lib/patternlab.js',
        dest: './core/lib/patternlab.js'
      },
      object_factory: {
        src: './core/lib/object_factory.js',
        dest: './core/lib/object_factory.js'
      },
      lineage: {
        src: './core/lib/lineage_hunter.js',
        dest: './core/lib/lineage_hunter.js'
      },
      media_hunter: {
        src: './core/lib/media_hunter.js',
        dest: './core/lib/media_hunter.js'
      },
      patternlab_grunt: {
        src: './core/lib/patternlab_grunt.js',
        dest: './core/lib/patternlab_grunt.js'
      },
      patternlab_gulp: {
        src: './core/lib/patternlab_gulp.js',
        dest: './core/lib/patternlab_gulp.js'
      },
      parameter_hunter: {
        src: './core/lib/parameter_hunter.js',
        dest: './core/lib/parameter_hunter.js'
      },
      pattern_exporter: {
        src: './core/lib/pattern_exporter.js',
        dest: './core/lib/pattern_exporter.js'
      },
      pattern_assembler: {
        src: './core/lib/pattern_assembler.js',
        dest: './core/lib/pattern_assembler.js'
      },
      pseudopattern_hunter: {
        src: './core/lib/pseudopattern_hunter.js',
        dest: './core/lib/pseudopattern_hunter.js'
      },
      list_item_hunter: {
        src: './core/lib/list_item_hunter.js',
        dest: './core/lib/list_item_hunter.js'
      },
      style_modifier_hunter: {
        src: './core/lib/style_modifier_hunter.js',
        dest: './core/lib/style_modifier_hunter.js'
      }
    },
    copy: {
      main: {
        files: [{
          expand: true,
          cwd: path.resolve(paths().source.js),
          src: '*.js',
          dest: path.resolve(paths().public.js)
        }, {
          expand: true,
          cwd: path.resolve(paths().source.css),
          src: '*.css',
          dest: path.resolve(paths().public.css)
        }, {
          expand: true,
          cwd: path.resolve(paths().source.images),
          src: ['**/*.png', '**/*.jpg', '**/*.gif', '**/*.jpeg'],
          dest: path.resolve(paths().public.images)
        }, {
          expand: true,
          cwd: path.resolve(paths().source.fonts),
          src: '*',
          dest: path.resolve(paths().public.fonts)
        }, {
          expand: true,
          cwd: path.resolve(paths().source.data),
          src: 'annotations.js',
          dest: path.resolve(paths().public.data)
        }]
      },
      styleguide: {
        files: [{
          expand: true,
          cwd: path.resolve(paths().source.styleguide),
          src: ['*.*', '**/*.*'],
          dest: path.resolve(paths().public.styleguide)
        }]
      },
      wordpress: {
        files: [{
          expand: true,
          cwd: path.resolve(paths().public.css),
          src: '*.css',
          dest: "/Users/edwin/Dropbox/ClionaJoyce/vagrant-local/www/wordpress-default/wp-content/themes/ClionaJoyce"
        },
        {
          expand: true,
          cwd: path.resolve(paths().public.js),
          src: ['modernizr.js', 'flickity.pkgd.min.js', 'homepage.js', 'flickity.pkgd.js'],
          dest: "/Users/edwin/Dropbox/ClionaJoyce/vagrant-local/www/wordpress-default/wp-content/themes/ClionaJoyce/js"
        }]
      },
      svg: {
        files: [{
          expand: true,
          cwd: 'public/images/icons',
          src: '*.css',
          dest: path.resolve(paths().source.css + 'scss/objects/'),
          rename: function (dest, src) {
            return dest + src.replace(/(^.*?)\.css$/, "\/_$1.scss");
          }
        }]
      }
    },
    watch: {
      all: {
        files: [
          path.resolve(paths().source.css + '**/*.scss'),
          path.resolve(paths().source.styleguide + 'css/*.css'),
          path.resolve(paths().source.patterns + '**/*.mustache'),
          path.resolve(paths().source.patterns + '**/*.json'),
          path.resolve(paths().source.fonts + '/*'),
          path.resolve(paths().source.images + '/*'),
          path.resolve(paths().source.data + '*.json'),
          path.resolve(paths().source.js + '/*.js')
        ],
        tasks: ['default', 'bsReload:css']
      }
    },
    nodeunit: {
      all: ['test/*_tests.js']
    },
    browserSync: {
      dev: {
        options: {
          server: path.resolve(paths().public.root),
          watchTask: true,
          watchOptions: {
            ignoreInitial: true,
            ignored: '*.html'
          },
          snippetOptions: {
            // Ignore all HTML files within the templates folder
            blacklist: ['/index.html', '/', '/?*']
          },
          plugins: [{
            module: 'bs-html-injector',
            options: {
              files: [path.resolve(paths().public.root + '/index.html'), path.resolve(paths().public.styleguide + '/styleguide.html')]
            }
          }],
          notify: {
            styles: [
              'display: none',
              'padding: 15px',
              'font-family: sans-serif',
              'position: fixed',
              'font-size: 1em',
              'z-index: 9999',
              'bottom: 0px',
              'right: 0px',
              'border-top-left-radius: 5px',
              'background-color: #1B2032',
              'opacity: 0.4',
              'margin: 0',
              'color: white',
              'text-align: center'
            ]
          }
        },
        snippetOptions: {
          // Ignore all HTML files within the templates folder
          blacklist: ['/index.html', '/']
        }
      }
    },
    eslint: {
      options: {
        configFile: './.eslintrc'
      },
      target: ['./core/lib/*']
    },
    bsReload: {
      css: path.resolve(paths().public.root + '**/*.css')
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'source/css/style.css': 'source/css/style.scss'
        }
      }
    },
    svgstore: {
      options: {},
      default: {
        files: {
          'public/images/icons.svg': ['source/images/icons/*.svg']
        }
      }
    },
    grunticon: {
      icons: {
        files: [{
          expand: true,
          cwd: 'source/images/icons',
          src: ['*.svg', '*.png'],
          dest: "public/images/icons"
        }],
        options: {
          customselectors: {
            "*": [".icon-$1:before"]
          }
        }
      }
    },
    modernizr: {
      default: {
        "crawl": false,
        "customTests": [],
        "dest": "source/js/modernizr.js",
        "tests": [
          "svg"
        ],
        "options": [
          "setClasses"
        ],
        "uglify": false
      }
    }
  });

  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  //load the patternlab task
  grunt.task.loadTasks('./core/lib/');

  grunt.registerTask('default', ['patternlab', 'sass', 'copy:main', 'copy:styleguide', 'copy:wordpress']);

  // travis CI task
  grunt.registerTask('travis', ['nodeunit', 'eslint', 'patternlab']);

  grunt.registerTask('serve', ['patternlab', 'sass', 'copy:main', 'copy:styleguide', 'copy:wordpress', 'browserSync', 'watch:all']);

  grunt.registerTask('build', ['nodeunit', 'eslint', 'concat']);

};