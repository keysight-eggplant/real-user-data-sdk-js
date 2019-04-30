import UserAgentParser from './utility/UserAgentParser';

export default class HardwareCollector extends UserAgentParser {

  async prepare (event) {
    const device = this.parser.getDevice();
    event.manufacturer = device.vendor || '';
    event.model = device.model || '';
    event.screenResolutionWidth = screen.width || 0;
    event.screenResolutionHeight = screen.height || 0;
    return event;
  }
}
