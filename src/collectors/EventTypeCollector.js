export default class eventTypeCollector{

  async prepare (event, eventType) {
    event.eventType = eventType;
    return event;
  }

}