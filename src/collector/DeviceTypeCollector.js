import UserAgentParser from './utility/UserAgentParser';

export default class DeviceTypeCollector extends UserAgentParser {

  async prepare (event) {
    const device = this.parser.getDevice();
    if (device.type) {
      event.deviceType = device.type;
    } else {
      event.deviceType = 'Unknown';
    }
    return event;
  }

}
