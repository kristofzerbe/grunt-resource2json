# grunt-resource2json

> Converting resource files (RESX) into JSON for [jquery-lang](github.com/Irrelon/jquery-lang-js) and other localization tools, which depends on JSON.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-resource2json --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-resource2json');
```

## The "resource2json" task

### Overview
In your project's Gruntfile, add a section named `resource2json` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
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
    });
```

### Options

#### format
Defines the format of the output JSON. Currently available:

* **jquery-lang**  
[https://github.com/Irrelon/jquery-lang-js](https://github.com/Irrelon/jquery-lang-js)

Please feel free and implement your own format and send a Pull Request.

### Files (Array)

#### input
Path to the RESX file to convert

#### output
Path to the output JSON file

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* **12.06.2020**  
Initial release
