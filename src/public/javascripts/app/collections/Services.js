define(["backbone", "models/Service"], function(Backbone, Service_model) {

    return Backbone.Collection.extend({
        model: Service_model,
        initialize: function() {

        },
        url: "http://localhost:8089/service"
    });

});