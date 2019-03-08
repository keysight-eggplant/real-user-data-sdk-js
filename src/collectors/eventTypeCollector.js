export function eventTypeCollector(eventType) {
  return async (event) => {
    event.eventType = eventType;
    return event;
  };
};