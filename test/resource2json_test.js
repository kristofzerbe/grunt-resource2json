'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.resource2json = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  testEN: function(test) {
    test.expect(1);

    var actual = grunt.file.read('temp/jquery-lang.en.json');
    var expected = grunt.file.read('test/expected/jquery-lang.en.json');
    test.equal(actual, expected, 'Test EN failed');

    test.done();
  },
  testDE: function(test) {
    test.expect(1);

    var actual = grunt.file.read('temp/jquery-lang.de.json');
    var expected = grunt.file.read('test/expected/jquery-lang.de.json');
    test.equal(actual, expected, 'Test DE failed');

    test.done();
  },
  testES: function(test) {
    test.expect(1);

    var actual = grunt.file.read('temp/jquery-lang.es.json');
    var expected = grunt.file.read('test/expected/jquery-lang.es.json');
    test.equal(actual, expected, 'Test ES failed');

    test.done();
  }
};
