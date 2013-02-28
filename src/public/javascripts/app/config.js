// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps: [ "main" ],

    paths: {
        // JavaScript folders.
        libs: "../libs",
        models: "../app/models",
        collections: "../app/collections",
        views: "../app/views",
        templates: "../app/templates",

        // Libraries.
        jquery: "../libs/jquery",
        underscore: "../libs/underscore",
        backbone: "../libs/backbone",
        d3: "../libs/d3.v3"
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'd3': {
          exports: 'd3'
        },

        'backbone': {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    }
});
