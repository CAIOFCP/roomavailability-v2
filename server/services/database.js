'use strict'
var Cloudant = require('cloudant')
var cloundantUser = 'cc299e77-0c13-4947-8382-5237fb663079-bluemix';
var cloundantPass = '50cb25b041e35932f99c53cb50a47d781394636850a0d06876f44179b87d3f3e';
var cloudant = Cloudant({account: cloundantUser, password: cloundantPass});
var database = cloudant.db.use('iotrooms')

class Database {

    persistDevice(device){
        const newObject = {
            device: device,
            room: null,
            addedIn: new Date()
        }
        database.insert(newObject,  function(err, body){
            if(!err){
                return 200 
            }else{
                console.log(err);
                return 404
            }
        });
    }

    findNotAssignedDevices(params){
        database.find({selector: {room: null}}, function(err, body){
            if(!err){
                console.log('available',body)
            }else{
                console.log(err)
            }
        })
    }
}

module.exports = Database

