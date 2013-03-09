var fs = require('fs');
var path = require('path');
var assert = require('assert-plus');
var restify = require("restify"),
    Backbone = require("backbone");
//    Module = require("../public/javascripts/app/modules/Module");
var xmlParser = require("xml2json");
var Log = require('util');
var ce = require('cloneextend');
var config = require('./config');
var env = 'st';
var domain = 'esb_online';
var server = restify.createServer({

});

var java = require("java");
// OSB: Only setup classpath once
java.classpath.push("configfwk-1.1.0.0.jar");
java.classpath.push("sb-kernel-impl-1.1.3.0.jar");
java.classpath.push("sb-kernel-api-3.0.jar");
java.classpath.push("sb-kernel-common-1.1.3.0.jar");
java.classpath.push("wlfullclient-10.3.0.jar");
java.classpath.push("standalone_client-11.1.1.jar");



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
}















function convertBlowtorchToJson() {
    fs.readFile('./myData/allServices.xml', 'utf8', function (err, data) {
        if (err) {
            Log.warn(err, 'get: unable to read %s', req.container);
            return;
        }

//        Log.log(xmlParser.toJson(data));
        fs.writeFile('./myData/allServices.json', JSON.stringify(getTransformedXmlAsJSON(data)), function (err) {
            if (err) {
                Log.warn(err, 'createTodo: unable to save');
            } else {
                Log.log("Loading allServices.json");
            }
        });
    });
}








function getTransformedXmlAsJSON(data) {
	var inJson = xmlParser.toJson(data, {object: true});
	var outJson = {};
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
							id: loop,
							name: oname
						};
					});
					webservices[webService.name] = {
						name: webService.name,
						operations: operations
					};
				}
			});
			outJson[cluster.name] = {
				name: cluster.name,
				webservices: webservices
			};
        	}
//        outJson.push({
//
//        })
    });
    Log.log(JSON.stringify(outJson));
    return outJson;
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

    res.send(200, req.services);
    next();
}


















function getOSBConfig(env, domain) {
	// Imports
	var JMXServiceURL = java.import('javax.management.remote.JMXServiceURL');
	var DomainRuntimeServiceMBean = java.import('weblogic.management.mbeanservers.domainruntime.DomainRuntimeServiceMBean');
	var Hashtable = java.import('java.util.Hashtable');
	var Context = java.import('javax.naming.Context');
	var JMXConnectorFactory = java.import('javax.management.remote.JMXConnectorFactory');
	var JMXConnector = java.import('javax.management.remote.JMXConnector');
	var ALSBConfigurationMBean = java.import('com.bea.wli.sb.management.configuration.ALSBConfigurationMBean');
	var ObjectName = java.import('javax.management.ObjectName');
	var Collections = java.import('java.util.Collections')
	var EnvValueQuery = java.import('com.bea.wli.config.env.EnvValueQuery');
	var Iterator = java.import('java.util.Iterator');
	var QualifiedEnvValue = java.import('com.bea.wli.config.env.QualifiedEnvValue');
	var MBeanServerInvocationHandler = java.import('weblogic.management.jmx.MBeanServerInvocationHandler');
	var Refs = java.import('com.bea.wli.sb.util.Refs');
	var EnvValueTypes = java.import('com.bea.wli.sb.util.EnvValueTypes');

	// Main
	var admin_server = config[env].osb_domains[domain].admin_server
	var serviceURL = new JMXServiceURL("t3", admin_server.hostname, admin_server.port,
                                "/jndi/" + DomainRuntimeServiceMBean.MBEANSERVER_JNDI_NAME);
	var h = new Hashtable();
	var username = admin_server.username;
	var password = admin_server.password;
	h.putSync(Context.SECURITY_PRINCIPAL, username);
	if (password == null) password = username;
	h.putSync(Context.SECURITY_CREDENTIALS, password);
	h.putSync(JMXConnectorFactory.PROTOCOL_PROVIDER_PACKAGES,
                                "weblogic.management.remote");
	var conn = JMXConnectorFactory.connectSync(serviceURL, h);
	var mbconn = conn.getMBeanServerConnectionSync();

	var domainService =
                        MBeanServerInvocationHandler.newProxyInstanceSync(
                                        mbconn, new ObjectName(DomainRuntimeServiceMBean.OBJECT_NAME));
	var alsbCore = domainService.findServiceSync(
                                        ALSBConfigurationMBean.NAME,
                                        ALSBConfigurationMBean.TYPE, null);
	var resourceSet = Collections.singletonSync(Refs.BUSINESS_SERVICE_TYPE);

	var evquery = new EnvValueQuery(
                                resourceSet, // null means all resource types
                                Collections.singletonSync(EnvValueTypes.SERVICE_URI), // envValueTypes (i.e. search URIs)
                                null, //Collections.singleton(serviceRef), // refsToSearch
                                false, // includeOnlyModifiedResources
                                null, // searchString
                                false // isCompleteMatch
                        );
	var results = alsbCore.findEnvValuesSync(evquery);
	var outJson = {};
	outJson[domain] = { webservices: {} };
	results.toArraySync().forEach(function(result) {
		var webservice = result.getOwnerSync().getFullNameSync().replace(/\/.*$/,'');
		var operation = result.getOwnerSync().getFullNameSync().replace(/^.*\//,'');
		var endpoint = result.getValueSync();
		if (outJson[domain].webservices[webservice] == undefined) {
			outJson[domain].webservices[webservice] = { operations: {} };
		}
		outJson[domain].webservices[webservice].operations[operation] = {
			endpoint: endpoint
		}
//		Log.log(result.getOwnerSync().getFullNameSync() + "\t" + result.getValueSync());
	});
	Log.log(JSON.stringify(outJson));
        fs.writeFile('./myData/allOSBConfig.json', JSON.stringify(outJson), function (err) {
            if (err) {
                Log.warn(err, 'createTodo: unable to save');
            } else {
                Log.log("Saved allOSBConfig.json");
            }
        });
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
        'GET /service/:name'
    ];
    res.send(200, routes);
    next();
});

Log.log('starting server...');
server.listen("8089", function() {
    console.log('%s listening at %s', server.name, server.url);
});

/*
convertBlowtorchToJson();
getOSBConfig('st', 'esb_online');
*/


var services = require('./myData/allServices.json');
var osbconfig = require('./myData/allOSBConfig.json');
var result = ce.extend(services, osbconfig);
Log.log(JSON.stringify(result, undefined, 2));
