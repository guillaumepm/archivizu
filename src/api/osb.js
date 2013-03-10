var Log = require('util');
var config = require('./config');

var java = require('java');
// OSB: Only setup classpath once
java.classpath.push('configfwk-1.1.0.0.jar');
java.classpath.push('sb-kernel-impl-1.1.3.0.jar');
java.classpath.push('sb-kernel-api-3.0.jar');
java.classpath.push('sb-kernel-common-1.1.3.0.jar');
java.classpath.push('wlfullclient-10.3.0.jar');
java.classpath.push('standalone_client-11.1.1.jar');

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



function connectToOSB(env, domain) {
    // Main
    var admin_server = config[env].osb_domains[domain].admin_server
    var serviceURL = new JMXServiceURL('t3', admin_server.hostname, admin_server.port,
        '/jndi/' + DomainRuntimeServiceMBean.MBEANSERVER_JNDI_NAME);
    var h = new Hashtable();
    var username = admin_server.username;
    var password = admin_server.password;
    h.putSync(Context.SECURITY_PRINCIPAL, username);
    if (password == null) password = username;
    h.putSync(Context.SECURITY_CREDENTIALS, password);
    h.putSync(JMXConnectorFactory.PROTOCOL_PROVIDER_PACKAGES,
        'weblogic.management.remote');
    var conn = JMXConnectorFactory.connectSync(serviceURL, h);
    return conn.getMBeanServerConnectionSync();
}

exports.getOSBBusinessServiceEndpoints = function(env, domain) {
    var mbconn = connectToOSB(env, domain);
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
    return outJson;
};