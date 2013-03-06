define(["backbone"], function(Backbone) {

    return Backbone.Model.extend({
        initialize: function() {

        },

        url: "http://localhost:8089/module"

//        defaults: {
//            id: new Number(),
//            name: new String(),
//            description: new String()
//        }
    });

});