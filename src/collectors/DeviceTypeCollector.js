// import UAParser from 'ua-parser-js';
import UAParserController from './utility/UAParserController';
class DeviceTypeCollector extends UAParserController{

  constructor() {
    super();
    this.deviceType;
    this.parser = this.getParser();
  }

  async prepare (event) {
    const device = this.parser.getDevice();
    event.deviceType = device.type;
    return event;
  }

}

export default DeviceTypeCollector;