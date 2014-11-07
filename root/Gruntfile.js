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

            'temp': {
                files: [
                    {
                        dest: 'temp',
                        cwd: 'src',
                        expand: true,
                        src: [
                            '**/*',
                            '!**/*.hbs'
                        ]
                    }
                ]
            },

            build: {
                files: [
                    {
                        dest: 'build/fonts',
                        cwd: 'src',
                        expand: true,
                        flatten: true,
                        src: [
                            '**/*.eot',
                            '**/*.svg',
                            '**/*.ttf',
                            '**/*.woff'
                        ]
                    },
                    {
                        dest: 'build',
                        cwd: 'src',
                        expand: true,
                        src: ['index.html']
                    }
                ]
            }
        },

        replace: {
            bower_css: {
                src: ['build/styles/*.css'],
                overwrite: true,
                replacements: [
                    {
                        from: '/components/bootstrap/fonts/',
                        to: '/fonts/'
                    }
                ]
            },
            index_build:{
                src: ['build/index.html'],
                overwrite: true,
                replacements: [
                    {
                        from: 'components/requirejs/js/require.js',
                        to: 'scripts/main.js'
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

        // HTML Compressor
        // ---------------
        htmlmin: {
            build: {
                options: {
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    removeCDATASectionsFromCDATA: true,
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                },

                files: [
                    {
                        expand: true,
                        cwd: 'build',
                        dest: 'build',
                        src: '**/*.html'
                    }
                ]
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

        // Micro-templating language
        // -------------------------
        handlebars: {
            compile: {
                options: {
                    namespace: false,
                    amd: true
                },

                files: [
                    {
                        expand: true,
                        cwd: 'src/scripts/templates',
                        src: '**/*.hbs',
                        dest: 'temp/scripts/templates',
                        ext: '.js'
                    }
                ]
            }
        },


        // Module conversion
        // -----------------
        requirejs: {
            build: {
                options: {
                    mainConfigFile: "temp/scripts/config/require-config.js",
                    include: _(grunt.file.expandMapping(['main*', 'controllers/**/*.js'], '',
                        {
                            cwd: 'temp/scripts/',
                            rename: function (base, path) {
                                return path.replace(/\.js$/, '');
                            }
                        }
                    )).pluck('dest'),
                    generateSourceMaps: false,
                    out: "build/scripts/main.js",
                    optimize: "uglify2",
                    baseUrl: "temp/scripts",

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
                files: ['src/scripts/**/*.js', 'src/styles/**/*.css'],
                tasks: ['jshint', 'copy:static'],
                options: {
                    livereload: true
                }
            },
            handlebars: {
                files: 'src/scripts/templates/**/*.hbs',
                tasks: 'handlebars:compile',
                options: {
                    interrupt: true
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

    // Build
    // -----
    // Compiles a development build of the application.
    grunt.registerTask('build_dev', [
        'clean:temp',
        'lint',
        'copy:temp',
        'handlebars',
    ]);

    // Compiles a production build of the application.
    grunt.registerTask('build_prod', [
        'build_dev',
        'clean:build',
        'cssjoin',
        'mincss',
        'htmlmin:build',
        'requirejs:build',
        'copy:build',
        'replace'
    ]);

    // Server
    // ------
    // Compiles a development build of the application; starts an HTTP server
    // on the output; and, initiates a watcher to re-compile automatically.
    grunt.registerTask('server_dev', [
        'build_dev',
        'connect:dev',
        'watch'
    ]);

    grunt.registerTask('server_prod', [
        'build_prod',
        'connect:prod',
    ]);

};