define(["backbone", "models/Links"], function(Backbone, Links_model) {

    return Backbone.Collection.extend({
        model: Links_model,
        initialize: function() {

        }
    });

});