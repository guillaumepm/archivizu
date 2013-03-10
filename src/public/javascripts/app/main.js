require([
    "jquery",
    "underscore",
    "backbone",
    "d3",
    "collections/Modules",
    "collections/Services",
    "collections/Links",
    "views/Application",
    "models/Module"
], function($, _, Backbone, d3, Modules_collection, Services_collection, Links_collection, Application_view, Module_model) {

//    var services_collection = new Modules_collection([{
//        id: 1,
//        name: "Login",
//        description: "Login interface for users"
//    }, {
//        id: 2,
//        name: "getUsage",
//        description: "Usage meters for service level users"
//    }]);


//    var modules_collection = new Modules_collection([{
//        id: 1,
//        name: "Login",
//        description: "Login interface for users"
//    }, {
//        id: 2,
//        name: "Usage",
//        description: "Usage meters for service level users",
//        service: "getUsage"
//    },{
//        id: 3,
//        name: "Service selector",
//        description: "Usage meters for service level users"
//    },{
//        id: 4,
//        name: "Billing summary",
//        description: "Usage meters for service level users"
//    },{
//        id: 5,
//        name: "Voicemail",
//        description: "Usage meters for service level users"
//    },{
//        id: 6,
//        name: "Replace Sim",
//        description: "Usage meters for service level users"
//    }]);
    var services_collection = new Services_collection();
    var modules_collection = new Modules_collection();
    var links_collection = new Links_collection();
    modules_collection.fetch({
        success: function(modules) {
            console.log("modules_collection");
            console.log(modules_collection.models);
            console.log(modules);
            services_collection.fetch({
	        success: function(services) {
            		links_collection.fetch({
				success: function(links) {
					var application_view = new Application_view({
                        el: "#main",
                        collection: modules_collection,
                        services: services_collection,
                        links: links_collection
                    });
                    console.log("links_collection");
                    console.log(links_collection.models);
                    console.log(links);

                    window.c = modules_collection;
                    application_view.render();
                }
        });
}
        });
        }
    });
//    var module = new Module_model();
//    module.fetch({
//        success: function(modules) {
//            console.log(modules.toJSON());
//            modules_collection = new Modules_collection(modules.toJSON());
//        }
//    });




//    application_view.renderServices();

});
