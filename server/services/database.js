'use strict'
var Cloudant = require('cloudant')
var cloundantUser = 'cc299e77-0c13-4947-8382-5237fb663079-bluemix';
var cloundantPass = '50cb25b041e35932f99c53cb50a47d781394636850a0d06876f44179b87d3f3e';
var cloudant = Cloudant({account: cloundantUser, password: cloundantPass});


class Database {

    constructor(database) {
        this.database = cloudant.db.use(database)
    }

    //create a new device
    persistDevice(device){
        const newObject = {
            device: device,
            space: null,
            addedIn: new Date()
        }
        this.database.insert(newObject,  function(err, body){
            if(!err){
                return 200 
            }else{
                console.log(err);
                return 404
            }
        });
    }

    //create a new space
    persistSpace(space, callback){
        this.database.insert(space,  function(err, body){
            if(!err){
                callback(200) 
            }else{
                console.log(err);
                return 404
            }
        });
    }

    //return devices without spaces
    findNotAssignedDevices(params, callback) {
        this.database.find({selector: {space: null}}, function(err, body){
            if(!err){
                callback(body)
            }else{
                console.log(err)
            }
        })
    }

    //return spaces without devices
    findNotAssignedSpaces(params, callback) {
        this.database.find({selector: {devices: []}}, function(err, body){
            if(!err){
                callback(body)
            }else{
                console.log(err)
            }
        })
    }

}

module.exports = Database

