module.exports = function (grunt) {
    'use strict';

    // Underscore
    // ==========
    var _ = grunt.util._;

    // Package
    // =======
    var pkg = require('./package.json');

    // Configuration
    // =============
    grunt.initConfig({

        // Cleanup
        // -------
        clean: {
            build: 'build',
            temp: 'temp',
            components: 'src/components'
        },

        // Dependency management
        // ---------------------
        bower: {
            install: {
                options: {
                    targetDir: 'src/components',
                    install: true,
                    verbose: true,
                    cleanBowerDir: true,
                    layout: 'byComponent'
                }
            }
        },

        // Wrangling
        // ---------
        copy: {
            options: {
                excludeEmpty: true
            },

            'static': {
                files: [
                    {
                        dest: 'temp',
                        cwd: 'src',
                        expand: true,
                        src: [
                            '**/*',
                            '!*.hbs'
                        ]
                    },
                    {
                        src: 'src/index_DEV.html',
                        dest: 'temp/index.html'
                    }
                ]
            },

            build: {
                files: [
                    {
                        dest: 'build/',
                        cwd: 'src',
                        expand: true,
                        src: [
                            '!**/*.js',
                            '!**/*.css',
                            '!**/*.map'
                        ]
                    },
                    {
                        src: 'src/index_PROD.html',
                        dest: 'build/index.html'
                    }
                ]
            }
        },

        // Stylesheet Compressor
        // ---------------------
        cssjoin: {
            join: {
                options: {
                    paths: ["src/styles"]
                },
                files: {
                    'build/styles/main.css': ['src/styles/main.css']
                }
            }
        },
        mincss: {
            compress: {
                files: {
                    'build/styles/main.css': 'build/styles/main.css'
                }
            }
        },

        // Script lint
        // -----------
        jshint: {
            options: {
                "curly": true,
                "eqeqeq": true,
                "immed": true,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "sub": true,
                "boss": true,
                "eqnull": true,
                "node": true,
                "browser": true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            },
            gruntfile: 'Gruntfile.js',
            src: [
                'src/scripts/**/*.js',
                '!components/**/*'
            ]
        },

        // Module conversion
        // -----------------
        requirejs: {
            app: {
                options: {
                    mainConfigFile: "src/scripts/config/require-config.js",
                    include: _(grunt.file.expandMapping(['main*', 'controllers/**/*.js'], '',
                        {
                            cwd: 'src/scripts/',
                            rename: function (base, path) {
                                return path.replace(/\.js$/, '');
                            }
                        }
                    )).pluck('dest'),
                    generateSourceMaps: false,
                    out: "build/scripts/myapp.js",
                    optimize: "uglify2",
                    baseUrl: "src/scripts",

                    paths: {
                        "almond": "../components/almond/js/almond"
                    },
                    name: "almond",
                    wrap: true,
                    preserveLicenseComments: false,
                    findNestedDependencies: true
                }
            }
        },

        // Watch
        // -----
        watch: {
            scripts: {
                files: 'src/**/*.js',
                tasks: ['jshint', 'copy:static'],
                options: {
                    livereload: true
                }
            }
        },

        // Webserver
        // ---------
        connect: {

            dev: {
                options: {
                    hostname: 'localhost',
                    base: 'temp'
                }
            },
            prod: {
                options: {
                    hostname: 'localhost',
                    base: 'build',
                    keepalive: true
                }
            }
        }

    });

    // Dependencies
    // ============
    for (var name in pkg.devDependencies) {
        if (name.substring(0, 6) === 'grunt-') {
            grunt.loadNpmTasks(name);
        }
    }


    /* =========== */
    /*    Tasks    */
    /* =========== */

    // Prepare
    // -------
    // Cleans the project directory of built files and downloads / updates
    // bower-managed dependencies.
    grunt.registerTask('prepare', [
        'clean',
        'bower'
    ]);

    // Lint
    // ----
    // Lints all applicable files.
    grunt.registerTask('lint', [
        'jshint'
    ]);

    // Server
    // ------
    // Compiles a development build of the application; starts an HTTP server
    // on the output; and, initiates a watcher to re-compile automatically.
    grunt.registerTask('server', [
        'copy:static',
        'connect:dev',
        'watch'
    ]);

    // Build
    // -----
    // Compiles a production build of the application.
    grunt.registerTask('build', [
        'clean:build',
        'jshint',
        'copy:build',
        'cssjoin',
        'mincss',
        'requirejs:app'
    ]);

    grunt.registerTask('server_prod', [
        'build',
        'connect:prod',
    ]);

};
