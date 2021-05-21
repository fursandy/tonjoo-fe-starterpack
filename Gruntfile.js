const sass = require("node-sass");

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    // configure sass for styling sheet -----------------------------------
    sass: {
      dist: {
        options: {
          implementation: sass,
          sourceMap: true,
          outputStyle: "compressed"
        },
        files: {
          "dist/css/main.min.css": "src/scss/main.scss",
          "dist/css/fonts.min.css": "src/scss/fonts.scss"
        }
      }
    },

    // configure autoprefixer for css -----------------------------------
    autoprefixer: {
      dist: {
        options: {
          map: true,
          browsers: ["last 2 version", "ie 8"]
        },
        files: {
          "dist/css/main.min.css": "dist/css/main.min.css",
          "dist/css/fonts.min.css": "dist/css/fonts.min.css",
        }
      }
    },

    // configure browserify for es6+ transpile -----------------------------------
    browserify: {
      dist: {
        files: {
          "src/js-compiled/main-compiled.js": "src/js/*.js",
        },
        options: {
          transform: [["babelify", { presets: "env" }]],
          browserifyOptions: {
            debug: false
          }
        }
      }
    },

    // configure uglify for minified and bundled js -----------------------------------
    uglify: {
      dist: {
        options: {
          sourceMap: false
        },
        files: {
          "dist/js/main.min.js": "src/js-compiled/*.js",
        }
      }
    },

    // configure watch task -----------------------------------
    watch: {
      javascript: {
        files: "src/**/*.js",
        tasks: ["browserify:dist", "uglify:dist"]
      },
      sass: {
        files: ["src/scss/**/*.scss"],
        tasks: ["sass:dist", "autoprefixer:dist"]
      },
      // add this extensions on your chrome to active livereload
      // https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
      livereload: {
        options: {
          livereload: true
        },
        files: ['**/*.css', '**/js/*.js', '*.php', '**/*.php']
      }
    }
  });

  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("buildCss", ["sass:prod", "autoprefixer:prod"]);

  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-autoprefixer");
  grunt.loadNpmTasks("grunt-browserify");
};