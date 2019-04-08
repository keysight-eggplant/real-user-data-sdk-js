export default class SpaTimingCollector {

  start() {
    this.eventStart = new Date().getTime();
  }

  clear() {
    this.eventStart = null;
  }

  async prepare (event) {
    event.eventStart = this.eventStart;
    event.eventEnd = new Date().getTime();
    return event;
  }

}
