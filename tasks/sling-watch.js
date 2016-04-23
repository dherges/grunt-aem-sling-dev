/*
 * grunt-aem-sling-dev
 * https://github.com/dherges/grunt-aem-sling-dev
 *
 * Copyright (c) 2016 David Herges
 * Licensed under the MIT license.
 */

/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {



  grunt.registerMultiTask('slingWatch', 'Watch for file changes and POST them to a sling server', function () {
    var done = this.async()

    var options = this.options(defOpts)

    // TODO ... someone needs to make this waaaaay better
    // -- can we use grunt-contrib-watch + grunt-newer
    // -- do we need to implement watch + filter changes + reload ourselves?!?

    new Gaze(options.watch.pattern, {}, function (err, watcher) {
      // On changed/added/deleted
      this.on('all', function(status, filepath) {

        var file = new File({path: filepath})
        workspace.for(file)
          .uploadFile(file, function (err, data, res) {
            grunt.log.writeln(msg)
          })

      })
    })
  }
}
