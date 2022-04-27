import UserAgentParser from '../core/utility/UserAgentParser.js';

export default class DeviceTypeCollector extends UserAgentParser {

  async prepare (event) {
    const device = this.parser.getDevice();
    event.deviceType = device.type || 'PC';
    return event;
  }

}
