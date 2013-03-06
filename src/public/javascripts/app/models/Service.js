define(["backbone"], function(Backbone) {

    return Backbone.Model.extend({
        initialize: function() {

        },
        url: "http://localhost:8089/service"
//        defaults: {
//            service: ""
//
//        }
    });

});