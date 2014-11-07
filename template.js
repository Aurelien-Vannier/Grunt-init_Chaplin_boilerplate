'use strict';

// Basic template description.
exports.description = 'Create a complete Chaplin.js boilerplate.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The initialize template.
exports.template = function(grunt, init, done) {
  var _ = grunt.util._;

  init.process({}, [
    // Prompt for the following values.
    // Built-In
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses'),
    init.prompt('author_name'),
    init.prompt('author_email')
  ], function(err, props) {
    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Gather standard and additional dependencies.
    var devDependencies = {
        "grunt": "0.4.x",
        "grunt-contrib-clean": "0.6.x",
        "grunt-contrib-copy": "0.7.x",
        "grunt-contrib-connect": "0.8.x",
        "grunt-contrib-watch": "0.6.x",
        "grunt-contrib-mincss": "0.4.x",
        "grunt-contrib-htmlmin": "0.3.x",
        "grunt-bower-task": "0.4.x",
        "grunt-urequire": "0.6.x",
        "lodash": "2.4.x",
        "grunt-contrib-jshint": "0.10.x",
        "grunt-contrib-handlebars": "0.9.x",
        "grunt-cssjoin": "^0.3.0"
    };

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', _.extend(props, {
      keywords: [],
      node_version: '0.10.x',
      devDependencies: devDependencies
    }));

    // Gather client-side, browser dependencies
    // Collect the standard ones.
    var dependencies = {
        "jquery": "2.1.x",
        "underscore": "1.7.x",
        "backbone": "1.1.x",
        "requirejs": "2.1.x",
        "almond": "0.2.x",
        "chaplin": "1.0.x",
        "handlebars": "2.0.x",
        "bootstrap": "3.2.x",
        "requirejs-text": "~2.0.12"
    };

    // Gatrher the export overrides (these are consumed by grunt-bower-task
    // to replace the main declaration in the component.json).
    // Collect the standard ones
    var exportsOverride = {
        "jquery": {
            "js": "dist/jquery.js"
        },
        "almond": {
            "js": "almond.js"
        },
        "backbone": {
            "js": "backbone.js"
        },
        "requirejs": {
            "js": "require.js"
        },
        "underscore": {
            "js": "underscore.js"
        },
        "chaplin": {
            "js": "chaplin.js"
        },
        "handlebars": {
            "js": "handlebars.runtime.js"
        },
        "bootstrap": {
            "js": "dist/js/bootstrap.js",
            "css": "dist/css/*",
            "font": "dist/font/*"
        },
        "requirejs-text": {
            "js": "text.js"
        }
    };

    // Generate a bower.json file.
    init.writePackageJSON('bower.json', {
      name: props.name,
      version: props.version,
      dependencies: dependencies
    }, function(pkg, props) {
      pkg.exportsOverride = exportsOverride;
      return pkg;
    });

    // All done!
    done();
  });

};
