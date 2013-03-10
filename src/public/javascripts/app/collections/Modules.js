define(["backbone", "models/Module"], function(Backbone, Module_model) {

    return Backbone.Collection.extend({
        model: Module_model,
        initialize: function() {

        },
        url: "http://pehr.johansson.optusnet.com.au:8089/module"
    });

});
