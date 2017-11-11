'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');
const constants = require('./constants')

//Sevices
const WIOT = require('../services/wiot')
let Device = require('../model/device')
var Database = require('../services/Database');
var db = new Database(constants.SPACES)

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
    //let space = request.params.space
    var client = getClient()
    const space = {
        id: 'TU0602',
        type: 'ROOM',
        devices: [],
        location: "TU06",
        name: "Austin",
        releasein: "",
        noshowin: ""
    }               

    db.persistSpace(space, (body) =>{
        response.sendStatus(body)           
    })
    //db.findNotAssignedDevices()
              
});


router.get('/notassigned', (request, response) =>{
    db.findNotAssignedSpaces(null, (body) => {
        response.send(body)  
    })
                 
});


router.post('/update/:space', (request, response) => {
    let space = request.params.space
    console.log(JSON.parse(space))
    db.persistSpace(JSON.parse(space), (status)=> {
        response.sendStatus(status)
  
    })
})
module.exports = router;
