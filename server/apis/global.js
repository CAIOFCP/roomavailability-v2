'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');
var Database = require('../services/Database');


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
 * The  api should return  the wiotp device to it, should return
 * id, type, token and orgID 
 */   


router.get('/status', (request, response) =>{
    response.send('all room status')
})


module.exports = router;
