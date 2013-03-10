var fs = require('fs');
var path = require('path');
var assert = require('assert-plus');
var restify = require("restify"),
    Backbone = require("backbone");
//    Module = require("../public/javascripts/app/modules/Module");
var xmlParser = require("xml2json");
var Log = require('util');
var ce = require('cloneextend');
var services = require('./services');
var osb = require('./osb');


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


var Container = Backbone.Model.extend({
    initialize: function() {

    },
    defaults: {
        id: new Number(),
        name: new String(),
        description: new String(),
        containers: new Backbone.Collection([ new Module() ])
    }
});

///--- Handlers
/**
 * Simply checks that a todo on /todo/:name was loaded.
 * Requires loadTodos to have run.
 */
function ensureContainer(req, res, next) {
    req.log.info('ensureContainer...');
    Log.log('censureContainer...');
    assert.arrayOfString(req.containers, 'req.containers');

    if (req.params.name && req.containers.indexOf(req.params.name) === -1) {
        req.log.warn('%s not found', req.params.name);
        next(new TodoNotFoundError(req.params.name));
    } else {
        next();
    }
}


/**
 * Loads a TODO by name
 *
 * Requires `loadTodos` to have run.
 *
 * Note this function uses streaming, as that seems to come up a lot
 * on the mailing list and issue board. restify lets you use the HTTP
 * objects as they are in "raw" node.
 *
 * Note by using the "raw" node APIs, you'll need to handle content
 * negotiation yourself.
 *
 */
function getContainer(req, res, next) {
    req.log.info('Get containers...');
    Log.log('cGet containers...');

    if (req.accepts('json')) {
        var fstream = fs.createReadStream(req.container);

        fstream.once('open', function onOpen() {
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            fstream.pipe(res);
            fstream.once('end', next);
        });

        // Really, you'd want to disambiguate the error code
        // from 'err' here to return 403, 404, etc., but this
        // is just a demo, so you get a 500
        fstream.once('error', next);
        return;
    }

    fs.readFile(req.container, 'utf8', function (err, data) {
        if (err) {
            req.log.warn(err, 'get: unable to read %s', req.container);
            next(err);
            return;
        }

        res.send(200, JSON.parse(data));
        next();
    });
}



/**
 * Loads up all the stored TODOs from our "database". Most of the downstream
 * handlers look for these and do some amount of enforcement on what's there.
 */
function loadContainers(req, res, next) {
    req.log.info('Loading containers...');
    Log.log('cLoading containers...');
    next();
//    fs.readdir(req.dir, function (err, files) {
//        if (err) {
//            req.log.warn(err,
//                'loadContainers: unable to read %s',
//                req.dir);
//            next(err);
//        } else {
//            req.containers = files;
//
//            if (req.params.name)
//                req.container = req.dir + '/' + req.params.name;
//
//            req.log.debug({
//                container: req.container,
//                containers: req.containers
//            }, 'loadContainers: done');
//
//            next();
//        }
//    });
}


/**
 * Simple returns the list of TODOs that were loaded.
 * This requires loadTodo to have run already.
 */
function listContainers(req, res, next) {
    req.log.info('List containers...');
    Log.log('cList containers...');
    assert.arrayOfString(req.containers, 'req.containers');

    res.send(200, req.containers);
    next();
}













/**
 * Simply checks that a todo on /todo/:name was loaded.
 * Requires loadTodos to have run.
 */
function ensureModel(req, res, next) {
    req.log.info('ensureModel...');
    Log.log('censureModel...');
    assert.arrayOfString(req.modules, 'req.modules');

    if (req.params.name && req.modules.indexOf(req.params.name) === -1) {
        req.log.warn('%s not found', req.params.name);
        next(new TodoNotFoundError(req.params.name));
    } else {
        next();
    }
}


/**
 * Loads a TODO by name
 *
 * Requires `loadTodos` to have run.
 *
 * Note this function uses streaming, as that seems to come up a lot
 * on the mailing list and issue board. restify lets you use the HTTP
 * objects as they are in "raw" node.
 *
 * Note by using the "raw" node APIs, you'll need to handle content
 * negotiation yourself.
 *
 */
function getModel(req, res, next) {
    req.log.info('Get module...');
    Log.log('cGet module...');

    if (req.accepts('json')) {
        var fstream = fs.createReadStream(req.module);

        fstream.once('open', function onOpen() {
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(200);
            fstream.pipe(res);
            fstream.once('end', next);
        });

        // Really, you'd want to disambiguate the error code
        // from 'err' here to return 403, 404, etc., but this
        // is just a demo, so you get a 500
        fstream.once('error', next);
        return;
    }

    fs.readFile(req.module, 'utf8', function (err, data) {
        if (err) {
            req.log.warn(err, 'get: unable to read %s', req.module);
            next(err);
            return;
        }

        res.send(200, JSON.parse(data));
        next();
    });
}



/**
 * Loads up all the stored TODOs from our "database". Most of the downstream
 * handlers look for these and do some amount of enforcement on what's there.
 */
function loadModules(req, res, next) {
    req.log.info('Loading modules...');
    Log.log('cLoading modules...');
    req.modules = require('./myData/allModules.json');
    Log.log(req.modules);
    console.log(req.modules);
    next();
}












/**
 * Loads up all the stored TODOs from our "database". Most of the downstream
 * handlers look for these and do some amount of enforcement on what's there.
 */
function loadServices(req, res, next) {
    req.log.info('Loading services...');
    Log.log('cLoading services...');
    req.services = require('./myData/allServices.json');
    req.links = require('./myData/allLinks.json');
    next();
}















function convertBlowtorchToJson() {
    fs.readFile('./myData/allServices.xml', 'utf8', function (err, data) {
        if (err) {
            Log.warn(err, 'get: unable to read %s', req.container);
            return;
        }

//        Log.log(xmlParser.toJson(data));
	var ret = getTransformedXmlAsJSON(data)
        fs.writeFile('./myData/allServices.json', JSON.stringify(ret.services), function (err) {
            if (err) {
                Log.warn(err, 'createTodo: unable to save');
            } else {
                Log.log("Loading allServices.json");
            }
        });
        fs.writeFile('./myData/allLinks.json', JSON.stringify(ret.links), function (err) {
            if (err) {
                Log.warn(err, 'createTodo: unable to save');
            } else {
                Log.log("Saved allLinks.json");
            }
        });
    });
}


function getServicesList(data) {
    var inJson = xmlParser.toJson(data, {object: true});
    var outJson = new Array();
    var loop = 0;
    inJson.deploymentArchitecture.Cluster.forEach(function(cluster) {
        if (cluster.AppServer.WebService instanceof Array) {
            cluster.AppServer.WebService.forEach(function(webService) {

                loop++;
                outJson.push({
                    id: loop,
                    name: webService.name
                });

            });
        }
    });
    Log.log(JSON.stringify(outJson));
    return outJson;
}





function getTransformedXmlAsJSON(data) {
	var inJson = xmlParser.toJson(data, {object: true, sanitize: false});
	var opJson = {};
	var linksJson = [];
	var loop = 0;
	inJson.deploymentArchitecture.Cluster.forEach(function(cluster) {
        	if (cluster.AppServer.WebService instanceof Array) {
			var webservices = {};
			cluster.AppServer.WebService.forEach(function(webService) {
				if (webService.Operation instanceof Array) {
					var operations = {};
					webService.Operation.forEach(function(operation) {
						loop++;
						var oname = operation.name.replace(/\(.*/,'');
						operations[oname] = {
							id: operation.name,
							name: oname
						};
						if (operation.CodeBlock != undefined && operation.CodeBlock.Downstream != undefined) {
Log.log("To: " + operation.CodeBlock.Downstream.To);
							linksJson.push({
								source: operation.name,
								target: operation.CodeBlock.Downstream.To
							});
						}
					});
					webservices[webService.name] = {
						name: webService.name,
						operations: operations
					};
				}
			});
			opJson[cluster.name] = {
				name: cluster.name,
				webservices: webservices
			};
        	}
    });
    //Log.log(JSON.stringify(opJson));
    return {services: opJson, links: linksJson};
}


/**
 * Simple returns the list of TODOs that were loaded.
 * This requires loadTodo to have run already.
 */
function listModules(req, res, next) {
    req.log.info('List modules...');
    Log.log('cList modules...');
//    assert.arrayOfObjects(req.modules, 'req.modules');

    res.send(200, req.modules);
    next();
}


function listServices(req, res, next) {
    req.log.info('List services...');
    Log.log('cList services...');
//    assert.arrayOfObjects(req.modules, 'req.modules');

Log.log('Or, Is it here?');
	var outJson = [];
	var loop = 0;
	for (var clusterKey in req.services) {
		for (var wsKey in req.services[clusterKey].webservices) {
Log.log('clusterKey: ' + clusterKey);
Log.log('wsKey: ' + wsKey);
			for (var operationKey in req.services[clusterKey].webservices[wsKey].operations) {
Log.log('operationKey: ' + operationKey);
				var operation = req.services[clusterKey].webservices[wsKey].operations[operationKey];
				if (operation.name == undefined) {
					Log.log('WARN: operation.name is empty - ' + operationKey);
					continue;
				}
				var oname = operation.name.replace(/\(.*/,'');
				outJson.push({
					id: operation.id,
					name: oname
				});
			}
		}
	}
	Log.log('Is it here?');
    res.send(200, outJson);
    //res.send(200, req.services);
    next();
}



function listLinks(req, res, next) {
    req.log.info('List links...');
    Log.log('cList links...');
//    assert.arrayOfObjects(req.modules, 'req.modules');

    res.send(200, req.links);
    next();
}

















// Use the common stuff you probably want
server.use(restify.acceptParser(server.acceptable));
server.use(restify.dateParser());
server.use(restify.authorizationParser());
server.use(restify.queryParser());
//server.use(restify.gzipResponse());
server.use(restify.bodyParser());


server.use(function setup(req, res, next) {
    req.dir = 'myData';
    next();
});


//-- Containers
//server.use(loadContainers);

server.get('/container', listContainers);
server.head('/container', listContainers);

// everything else requires that the Container exist
//server.use(ensureContainer);

// Return a Container by name
server.get('/container/:name', getContainer);
server.head('/container/:name', getContainer);

//-- Modules
server.use(loadModules);
server.use(loadServices);
server.get('/service', listServices);
server.get('/link', listLinks);

server.get('/module', listModules);
server.head('/module', listModules);

// everything else requires that the Container exist
//server.use(ensureModel);

// Return a Model by name
server.get('/module/:name', getModel);
server.head('/module/:name', getModel);


// Register a default '/' handler

server.get('/', function root(req, res, next) {
    var routes = [
        'GET /',
        'GET /container',
        'GET /container/:name',
        'GET /module',
        'GET /module/:name',
        'GET /service',
        'GET /service/:name',
        'GET /link',
        'GET /link/:name'
    ];
    res.send(200, routes);
    next();
});

Log.log('starting server...');
server.listen("8089", function() {
    console.log('%s listening at %s', server.name, server.url);
});

convertBlowtorchToJson();
/*
getOSBConfig('st', 'esb_online');
outJson = osb.getOSBBusinessServiceEndpoints('st', 'esb_online');
fs.writeFile('./myData/allOSBConfig.json', JSON.stringify(outJson), function (err) {
    if (err) {
        Log.warn(err, 'createTodo: unable to save');
    } else {
        var services = require('./myData/allServices.json');
        var osbconfig = require('./myData/allOSBConfig.json');
        var result = ce.extend(services, osbconfig);
//        Log.log(JSON.stringify(result, undefined, 2));
        Log.log("Saved allOSBConfig.json");
    }
});

*/


