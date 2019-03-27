export function eventActionCollector(eventAction) {
  return async (event) => {
    event.eventAction = eventAction;
    return event;
  }
}