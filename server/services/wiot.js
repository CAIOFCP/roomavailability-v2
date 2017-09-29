'use restric'

const Client = require('ibmiotf')

var wiot = require('ibmiotf')
const appId = 'roomsavailability'

class WIOT {
    constructor(orgId, apiKey, apiToken){                
        this.appClient = new Client.IotfApplication(
            {
                "org" : orgId,
                "id" : appId,
                "domain": "internetofthings.ibmcloud.com",
                "auth-key" : apiKey,
                "auth-token" : apiToken
            }
        );
    }

    connect(){
        console.log('connect')
       this.appClient.connect()
    }

    subscribe(typeId, deviceId){
       connect()    
        this.appClient.on("connect", function () {        
            appClient.subscribeToDeviceEvents(typeId, deviceId,"+","json");        
        });
    }

    getDevicesPerRoom(params){               
       this.appClient.getAllDevices(params)
       .then((result)=> {
           console.log(result)
           return result
       })
    }
}

module.exports = WIOT
