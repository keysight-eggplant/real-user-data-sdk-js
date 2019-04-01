export default class eventTypeCollector{

  constructor(eventType) {
    this.eventType = eventType;
  }

  async prepare (event) {
    event.eventType = this.eventType;
    return event;
  }

}