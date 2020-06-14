/*
 * grunt-resource2json
 * https://github.com/kristofzerbe/grunt-resource2json
 *
 * Copyright (c) 2020 Kristof Zerbe
 * Licensed under the MIT license.
 */

'use strict';

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
      
      xmlParser.parseString(xml, {
          explicitArray: false
        }, function(err, result) {

          if (err) {
            grunt.log.warn("Parsing of '" + f.Input + "' failed");
            return false;
          }

          var json;
          switch (options.format.toUpperCase()) {

            case "JQUERY-LANG":
              grunt.log.writeln("Convert into '" + options.format + "' to file '" + f.output + "'");
              json = {
                "token": {}
              };
              result.root.data.forEach(function(d) {
                  //grunt.log.writeln("Create token '" + d.$.name + "'");
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
          grunt.file.write(f.output, JSON.stringify(json));
          var msg = "Output file '" + f.output + "' created";
          grunt.log.writeln(msg["green"].bold);
        });

    });

  });

  var ConvertToJqueryLang = function() {
    return null;
  };

};
