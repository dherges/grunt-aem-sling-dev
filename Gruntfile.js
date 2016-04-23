/*
 * grunt-aem-sling-dev
 * https://github.com/dherges/grunt-aem-sling-dev
 *
 * Copyright (c) 2016 David Herges
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    slingPost: {
      target: {
        src: ['test/jcr_root/**/*.js', 'test/jcr_root/**/*.css']
      }
    },

    slingWatch: {
      author: {
        pattern: "**/*.js, **/*.css",
        options: {
          remote: 'http://localhost:4502',
          user: 'admin',
          pass: 'admin'
        }
      }
    },

    aemWatch: {
      author: {
        directory: "test/fixtures/jcr_root"
      }
    },


    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          captureFile: 'test/reports/results.txt', // Optionally capture the reporter output to a file
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false // Optionally clear the require cache before running tests (defaults to false)
        },
        src: ['specs/**/*.js']
      }
    }
  })


  grunt.loadTasks('tasks')

  grunt.loadNpmTasks('grunt-mocha-test')

  // Default task(s).
  grunt.registerTask('default', [])

}
