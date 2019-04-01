export default class EventTypeCollector{

  constructor(eventType) {
    this.eventType = eventType;
  }

  async prepare (event) {
    event.eventType = this.eventType;
    return event;
  }

}