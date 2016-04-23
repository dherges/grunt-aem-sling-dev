/*
 * grunt-aem-sling-dev
 * https://github.com/dherges/grunt-aem-sling-dev
 *
 * Copyright (c) 2016 David Herges
 * Licensed under the MIT license.
 */

var File = require('vinyl')
  , workspace = require('aem-sling-dev-well').workspace


/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {

  var defOpts = {
    watch: {
      pattern: '**/*'
    }
  }


  grunt.registerMultiTask('slingPost', 'POST files to a sling instance', function () {
    var done = this.async()
      , options = this.options(defOpts)

    this.files.forEach(function(file) {
      var f = file.src.filter(function(filepath) {
        if (grunt.file.exists(filepath)) {
          return true
        } else {
          grunt.log.warn('Source file "' + filepath + '" not found.')
          return false
        }
      })

      var cnt = f.length
        , ws
      f.forEach(function (filepath) {
        var file = new File({path: filepath})
        if (!ws) {
          ws = workspace.for(file)
            .uploadFile(file, function (err, data, res) {
              grunt.log.writeln(msg)
            })
        }

        ws.uploadFile(file, function (err, data, res) {
          cnt -= 1
          if (cnt === 0) {
            done()
          }

          grunt.log.writeln(msg)
        })
      })
    })
  }

}
