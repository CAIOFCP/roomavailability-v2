'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');
var Database = require('../services/Database');
var constants = require('./constants')
var db = new Database(constants.IOT_ROOMS)    

//Sevices
const WIOT = require('../services/wiot')
let Device = require('../model/device')

const API_KEY = constants.API_KEY
const ORG_ID = constants.ORG_ID
const API_TOKEN = constants.API_TOKEN

const getDevice = (typeId, deviceId, opts) => {
    return new Device(typeId, deviceId, opts)
}

const getClient = () => {
   return new WIOT(ORG_ID,API_KEY,API_TOKEN);
}


 /******************************************************************
 *  This route is called from the phisycal device on it first start    
 * The  api should return  the wiotp device to it, should return
 * id, type, token and orgID 
 *******************************************************************/

router.get('/new', (request, response) =>{    
    var client = getClient()
    const deviceId = 'TU0602'
    const typeId = 'TYPE'
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
            db.persistDevice(res)
            db.findNotAssignedDevices()
            response.send(res)
        },
        err => console.log(err)
    )    
});


/***************************************************************************
 * This route return a array of devices that are not associated to any space
 ***************************************************************************/

router.get('/notassigned', (request, response) => {
    db.findNotAssignedDevices(null, (body) => {
        response.send(body)
    })
})

module.exports = router;
