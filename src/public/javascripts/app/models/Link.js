define(["backbone"], function(Backbone) {

    return Backbone.Model.extend({
        initialize: function() {

        },
        url: "http://pehr.johansson.optusnet.com.au:8089/link"
//        defaults: {
//            source: new Object(),
//            target: new Object()
//        }
    });

});
