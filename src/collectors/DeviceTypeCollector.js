import UAParserController from './utility/UAParserController';
export default class DeviceTypeCollector extends UAParserController{

  constructor() {
    super();
  }

  async prepare (event) {
    const device = this.parser.getDevice();
    event.deviceType = device.type;
    return event;
  }

}