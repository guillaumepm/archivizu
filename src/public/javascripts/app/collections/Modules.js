define(["backbone", "models/Module"], function(Backbone, Module_model) {

    return Backbone.Collection.extend({
        model: Module_model,
        initialize: function() {

        },
        url: "http://localhost:8089/module"
    });

});