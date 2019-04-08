export default class EventActionCollector {

  constructor(eventAction) {
    this.eventAction = eventAction;
  }

  async prepare (event) {
    event.eventAction = this.eventAction;
    return event;
  }

}
