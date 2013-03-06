define(["backbone"], function(Backbone) {

    return Backbone.Model.extend({
        initialize: function() {

        },
        defaults: {
            source: new Object(),
            target: new Object()
        }
    });

});