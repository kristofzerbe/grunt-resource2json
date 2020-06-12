/*
 * grunt-resource2json
 * https://github.com/kristofzerbe/grunt-resource2json
 *
 * Copyright (c) 2020 Kristof Zerbe
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    resource2json: {
      convert: {
        options: {
          format: "jquery-lang"
        },
        files: [
          {
            input: "test/fixtures/Resource.resx",
            output: "temp/jquery-lang.en.json"
          },
          {
            input: "test/fixtures/Resource.de-DE.resx",
            output: "temp/jquery-lang.de.json"
          },
          {
            input: "test/fixtures/Resource.es-ES.resx",
            output: "temp/jquery-lang.es.json"
          }

        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'resource2json', 'nodeunit']);
  //grunt.registerTask('test', ['clean', 'resource2json']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
