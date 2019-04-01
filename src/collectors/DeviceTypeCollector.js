export default class DeviceTypeCollector {

  constructor() {
    this.deviceType;
  }

  async prepare (event, deviceType) {
    event.deviceType = deviceType;
    return event;
  }

}