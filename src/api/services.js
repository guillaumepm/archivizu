var fs = require('fs'),
    path = require('path'),
    assert = require('assert-plus'),
    restify = require("restify"),
    Backbone = require("backbone"),
    xmlParser = require("xml2json"),
    Log = require('util');



exports.getBlowTorch = function() {
        req.log.info('Loading services...');
        Log.log('cLoading services...');
        req.services = '';
        fs.readFile('./myData/allServices.xml', 'utf8', function (err, data) {
            if (err) {
                req.log.warn(err, 'get: unable to read %s');
                next(err);
                return;
            }

//        Log.log(xmlParser.toJson(data));
//            fs.writeFile('./myData/allServices.json', JSON.stringify(getTransformedXmlAsJSON(data)), function (err) {
//                if (err) {
//                    req.log.warn(err, 'createTodo: unable to save');
//                    next(err);
//                } else {
//                    Log.log("Loading allServices.json");
//                    req.services = require('./myData/allServices.json');
//                    next();
//                }
//            });




        });
};