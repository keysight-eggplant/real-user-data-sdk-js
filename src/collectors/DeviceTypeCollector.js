import UAParser from 'ua-parser-js';
export default class DeviceTypeCollector {

  constructor() {
    this.deviceType;
  }

  async prepare (event) {
    const parser = new UAParser();
    const device = parser.getDevice();
    event.deviceType = device.type;
    return event;
  }

}