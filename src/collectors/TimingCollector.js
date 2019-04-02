export default class TimingCollector {

  constructor() {
    this.performanceData = window.performance.timing;
  }

  async prepare (event) {
    event.eventStart = this.performanceData.navigationStart;
    event.eventEnd = new Date().getTime();
    return event;
  }

}