export default class UserAgentCollector {

  constructor() {
    this.userAgent = navigator.userAgent;
  }

  async prepare (event) {
    event.softwareInfo4 = this.userAgent;
    return event;
  }
}
