define(["backbone", "models/Service"], function(Backbone, Service_model) {

    return Backbone.Collection.extend({
        model: Service_model,
        initialize: function() {

        },
        url: "http://pehr.johansson.optusnet.com.au:8089/service"
    });

});
