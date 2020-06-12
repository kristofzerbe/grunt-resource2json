/*
 * grunt-resource2json
 * https://github.com/kristofzerbe/grunt-resource2json
 *
 * Copyright (c) 2020 Kristof Zerbe
 * Licensed under the MIT license.
 */

'use strict';

var Gruntfile = require("../Gruntfile");
var xmlParser = require('xml2js');

module.exports = function(grunt) {

  grunt.registerMultiTask('resource2json', 'Converting Resource files (RESX) into JSON for js-lang and other localization tools', function() {

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
            grunt.log.writeln("Convert into '" + options.format + "' to file '" + f.output + "'");
            json = {
              "token": {}
            };
            result.root.data.forEach(function(d) {
                grunt.log.writeln("Create token '" + d.$.name + "'");
                json.token[d.$.name] = d.value;
            });
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

  });
};
