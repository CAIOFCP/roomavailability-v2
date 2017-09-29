/*eslint-env node*/

//------------------------------------------------------------------------------
// hello world app is based on node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

var WIOT = require('./server/services/wiot')
var client = new WIOT('9z8ou7','a-9z8ou7-1e1hw63t3m','?v*Vs!S?UzrGRZ6QS7')
client.connect()
const devices = client.getDevicesPerRoom('TU0601')
console.log(devices)
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

