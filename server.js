/*global connect require __dirname console*/
/**
 * Simple connect static server for testing.
 * Later, could add express.
 */

var middleware = require('connect');

var server = middleware.createServer(
    middleware.favicon(),
    middleware.logger(),
    middleware['static'](__dirname + "/src/public")
);

server.listen(3000);

console.log("Static server listening at port 3000... (ctrl+c to stop)");