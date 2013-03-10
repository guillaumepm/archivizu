define(["backbone", "models/Link"], function(Backbone, Link_model) {

    return Backbone.Collection.extend({
        model: Link_model,
        initialize: function() {

        },
        url: "http://pehr.johansson.optusnet.com.au:8089/link"
    });

});
