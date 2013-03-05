var restify = require("restify"),
    Backbone = require("backbone");

var server = restify.createServer({

});


var Module = Backbone.Model.extend({
    initialize: function() {

    },
    defaults: {
        id: new Number(),
        name: new String(),
        description: new String()
    }
});

var module = new Module();

server.get("/", function(req, res, next) {

    res.send(200, module);

});


server.listen("8089", function() {
    console.log('%s listening at %s', server.name, server.url);
});

