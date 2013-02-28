define(["backbone"], function(Backbone) {

    return Backbone.Model.extend({
       initialize: function() {

       },
        defaults: {
            id: new Number(),
            name: new String(),
            description: new String()
        }
    });

});