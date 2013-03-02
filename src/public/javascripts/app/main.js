require([
    "jquery",
    "underscore",
    "backbone",
    "d3",
    "collections/Modules",
    "views/Application"
], function($, _, Backbone, d3, Modules_collection, Application_view) {

    var modules_collection = new Modules_collection([{
        id: 1,
        name: "Login",
        description: "Login interface for users"
    }, {
        id: 2,
        name: "Usage",
        description: "Usage meters for service level users"
    },{
        id: 3,
        name: "Service selector",
        description: "Usage meters for service level users"
    },{
        id: 4,
        name: "Billing summary",
        description: "Usage meters for service level users"
    },{
        id: 5,
        name: "Voicemail",
        description: "Usage meters for service level users"
    },{
        id: 6,
        name: "Replace Sim",
        description: "Usage meters for service level users"
    }]);

    console.log(modules_collection);
    var application_view = new Application_view({
        el: "#main",
        collection: modules_collection
    });

    window.c = modules_collection;


    application_view.render();

});