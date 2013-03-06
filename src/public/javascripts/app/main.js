require([
    "jquery",
    "underscore",
    "backbone",
    "d3",
    "collections/Modules",
    "collections/Services",
    "collections/Links",
    "views/Application"
], function($, _, Backbone, d3, Modules_collection, Services_collection, Links_collection, Application_view) {

    var services_collection = new Modules_collection([{
        id: 1,
        name: "Login",
        description: "Login interface for users"
    }, {
        id: 2,
        name: "getUsage",
        description: "Usage meters for service level users"
    }]);


    var modules_collection = new Modules_collection([{
        id: 1,
        name: "Login",
        description: "Login interface for users"
    }, {
        id: 2,
        name: "Usage",
        description: "Usage meters for service level users",
        service: "getUsage"
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

    var links_collection = new Links_collection([
        {
            source: modules_collection.where({id: 1})[0],
            target: services_collection.where({id: 1})[0]
        },{
            source: modules_collection.where({id: 1})[0],
            target: services_collection.where({id: 2})[0]
        }, {
            source: modules_collection.where({id: 2})[0],
            target: services_collection.where({id: 1})[0]
        },{
            source: modules_collection.where({id: 3})[0],
            target: services_collection.where({id: 1})[0]
        },{
            source: modules_collection.where({id: 4})[0],
            target: services_collection.where({id: 2})[0]
        },{
            source: modules_collection.where({id: 5})[0],
            target: services_collection.where({id: 2})[0]
        },{
            source: modules_collection.where({id: 6})[0],
            target: services_collection.where({id: 2})[0]
        },
        {
            source: modules_collection.where({id: 3})[0],
            target: modules_collection.where({id: 5})[0]
        }
    ]);

    var application_view = new Application_view({
        el: "#main",
        collection: modules_collection,
        services: services_collection,
        links: links_collection
    });

    window.c = modules_collection;


    application_view.render();
//    application_view.renderServices();

});