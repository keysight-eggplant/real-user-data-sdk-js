/* eslint-disable no-restricted-globals */

import UserAgentParser from '../core/utility/UserAgentParser.js';

export default class HardwareCollector extends UserAgentParser {

  async prepare (event) {
    const device = this.parser.getDevice();
    event.manufacturer = device.vendor || '';
    event.model = device.model || '';
    event.screenResolutionWidth = screen.width || null;
    event.screenResolutionHeight = screen.height || null;
    return event;
  }
}
