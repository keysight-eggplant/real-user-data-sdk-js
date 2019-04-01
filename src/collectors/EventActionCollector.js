export default class EventActionCollector{

  async prepare (event, eventAction) {
    event.eventAction = eventAction;
    return event;
  }

}