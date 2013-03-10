define(["backbone"], function(Backbone) {

    return Backbone.Model.extend({
        initialize: function() {

        },

        url: "http://pehr.johansson.optusnet.com.au:8089/module"

//        defaults: {
//            id: new Number(),
//            name: new String(),
//            description: new String()
//        }
    });

});
