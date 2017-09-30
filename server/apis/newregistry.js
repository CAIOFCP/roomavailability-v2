'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');
var Cloudant = require('cloudant');


//Sevices
const WIOT = require('../services/wiot')
let Device = require('../model/device')

const API_KEY = 'a-lkov9a-6o6wgu856n'
const ORG_ID = 'lkov9a'
const API_TOKEN = 'F6mnalQ7PWU_L2NUsa'   

const getDevice = (typeId, deviceId, opts) => {
    return new Device(typeId, deviceId, opts)
}

const getClient = () => {
   return new WIOT(ORG_ID,API_KEY,API_TOKEN);
}

/******************************************************************
 *  This route is called from the phisycal device on it first start    
 * The device should send the it's serialNumber and the api should return
 * the wiotp device to it, including deviceId, type and token
 * so the device can connect to the wiotp
 * 
 */   
router.get('/newdevice', (request, response) =>{
    let serialNumber = request.params.serialNumber
    var client = getClient()
    const deviceId = 'TU0602'
    const typeId = 'ROOM'
    const opts = {
        deviceInfo: {
            serialNumber: 'TU0601',
            manufacturer: 'IBM',
            deviceClass: 'OCUPATION',
        },
        location: 'TU0601',
        password: '12345678'
    }    
    var device = getDevice(typeId, deviceId, opts)
    client.createDevice(device.toObject()).then(
        (res) => {           
            response.send(res)
        },
        err => console.log(err)
    )    
});

module.exports = router;
