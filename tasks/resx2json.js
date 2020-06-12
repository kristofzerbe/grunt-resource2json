/*
 * grunt-resx2json
 * https://github.com/krze/grunt-resx2json
 *
 * Copyright (c) 2020 Kristof Zerbe
 * Licensed under the MIT license.
 */

'use strict';

var Gruntfile = require("../Gruntfile");
var xmlParser = require('xml2js');

module.exports = function(grunt) {

  grunt.registerMultiTask('resx2json', 'Converting RESX into JSON for js-lang', function() {

    var options = this.options({
      encoding: grunt.file.defaultEncoding,
      format: ""
    });

    this.data.files.forEach(function(f) {

      if (!grunt.file.exists(f.input)) {
        grunt.log.warn("Source file '" + f.input + "' not found.");
        return false;
      }

      grunt.log.writeln("Read file '" + f.input);
      var xml = grunt.file.read(f.input);
      
      xmlParser.parseStringPromise(xml, {
        explicitArray: false
      }).then(function (result) {

        var json;
        switch (options.format.toUpperCase()) {
          case "JQUERY-LANG":
            json = new Convert2JqueryLang(result);
            break;

          // Feel free to implement your format here
          // case "YOUR-FORMAT":
          //   break;

          default:
            grunt.log.warn("The format '" + options.format + "' is not implemented");
            return false;
        }

        grunt.log.writeln("Write " + f.output);
        grunt.file.write(f.output, JSON.stringify(json));
        grunt.log.writeln();
      })
      .catch(function (err) {
        grunt.log.warn("Parsing of '" + f.Input + "' failed");
        return false;
      });

    });

    var Convert2JqueryLang = function(xmlJson) {
      grunt.log.writeln("Converting to query-lang");
      var langPack = {
        "token": {}
      };
      xmlJson.root.data.forEach(function(d) {
          grunt.log.writeln("Create token '" + d.$.name + "'");
          langPack.token[d.$.name] = d.value;
      });
      return langPack;
    };

  });
};
