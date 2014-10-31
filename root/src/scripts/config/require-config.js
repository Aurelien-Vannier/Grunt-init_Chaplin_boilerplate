/**
 * Created by aurelien.vannier on 29/10/2014.
 */
// Configure the AMD module loader
requirejs.config({
    // The path where your JavaScripts are located
    baseUrl: './scripts/',
    // Specify the paths of vendor libraries
    paths: {
        jquery: '../components/jquery/js/jquery',
        underscore: '../components/underscore/js/underscore',
        backbone: '../components/backbone/js/backbone',
        handlebars: '../components/handlebars/js/handlebars.runtime',
        chaplin: '../components/chaplin/js/chaplin',
        bootstrap: '../components/bootstrap/js/bootstrap'
    },
    // Underscore and Backbone are not AMD-capable per default,
    // so we need to use the AMD wrapping of RequireJS
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery', 'bootstrap'],
            exports: 'Backbone'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
    // For easier development, disable browser caching
    // Of course, this should be removed in a production environment
    //, urlArgs: 'bust=' +  (new Date()).getTime()
});

// Bootstrap the application
require(['application', 'routes'], function(Application, routes) {
    new Application({routes: routes, controllerSuffix: '-controller'});
});