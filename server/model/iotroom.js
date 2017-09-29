'use restrict'
var ibmiotf = require('ibmiotf')

//That class represents the room in WIoTP
class IoTRoom {
    constructor(room, devices){
        this.room = room;
        this.devices = room;
    }

    getDevices(){
        return this.devices
    }

}