'use strict'

const Client = require('ibmiotf')

class Device {
  constructor(typeId, deviceId, opts) {
    console.log("Device::Device(typeId=" + typeId + ", deviceId=" + deviceId + ", opts=" + JSON.stringify(opts) + ")");
    this.typeId = typeId
    this.deviceId = deviceId
    this.connected = opts.connected || false
    this.location = opts.location || null
    this.deviceInfo = opts.deviceInfo
    this.sentCount = 0
    this.topic = '' 
    this.password = opts.password   
  }

  toObject() {
    return {
      typeId: this.typeId,
      deviceId: this.deviceId,
      connected: false,
      location: this.location,
      deviceInfo:this.deviceInfo,            
      password: '12345678' 
    }
  }

  connect() {
    const opts = {
      org: this.org,
      domain: this.domain,
      id: this.deviceId,
      type: this.typeId,
      'auth-method': 'token',
      'auth-token': 'password',
      'use-client-certs': false,
      'no-ssl': true,
    }
    
    console.log(opts)
    this.client = new Client.IotfManagedDevice(opts)
    this.client.on('connect', () => this.handleConnect())
    this.client.on('disconnect', () => this.handleDisconnect())    
    this.client.connect()    
  }

  disconnect() {
    this.client.disconnect()
  }

  handleConnect() {
    console.log(this.typeId + ':' + this.deviceId + ' connected')
    this.connected = true
    this.sendUpdate('connectDevice')
  }

  handleDisconnect() {
    console.log(this.typeId + ':' + this.deviceId + ' disconnected')
    this.connected = false
    clearInterval(this.publishInterval)
    this.sendUpdate('disconnectDevice')
  }

  sendUpdate(key) {
    key = key ? key : 'device'
    this.db.push("/devices/" + this.deviceId, this.toObject());
    console.log('sendUpdate',key)
    
    setTimeout(() => this.sendMessage(key, Object.assign({}, this.toObject(), { lastPayload: this.lastPayload })), 200)
  }
}

module.exports = Device

