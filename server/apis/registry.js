var express = require('express');
var router = express.Router();
var request = require('request');
var Cloudant = require('cloudant');
var cfenv = require('cfenv');



//Constants
// const API_KEY = 'a-9z8ou7-1e1hw63t3m'
// const ORG_ID = '9z8ou7'
// const API_TOKEN = '?v*Vs!S?UzrGRZ6QS7'

(function() {

const API_KEY = 'a-lkov9a-6o6wgu856n'
const ORG_ID = 'lkov9a'
const API_TOKEN = 'F6mnalQ7PWU_L2NUsa'

// const Device = require('../model/device')
// var WIOT = require('../services/wiot')
 

// router.get('/newdevice', (request, response) =>{
//     let serialNumber = request.params.serialNumber
//     var client = new WIOT(ORG_ID,API_KEY,API_TOKEN);
//     const deviceId = 'TU0601'
//     const typeId = 'ROOM'
//     const opts = {
//         deviceInfo: {
//             serialNumber: 'TU0601',
//             manufaturer: 'IBM',
//             deviceClass: 'OCUPATION',

//         },
//         location: 'TU0601'
//     }    
//     var device = new Device(typeId, deviceId, opts);
//     client.createDevice(device).then(
//         res => response.send(res),
//         err => console.log(err)
//     )    
// })


module.exports = router;
  
})();


