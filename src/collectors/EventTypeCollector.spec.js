import EventTypeCollector from './EventTypeCollector';

describe('EventTypeCollector', () => {
  const originalEvent = {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
    eventAction: 'load',
    eventSource: 'products/shoes/1',
    eventCategory: 'products/shoes',
    eventStart: 123,
    eventEnd: 456
  };

  const expectedEvent = {
    ...originalEvent,
    eventType: 'state'
  }
  let eventTypeCollector;


  beforeEach(() => {
    eventTypeCollector = new EventTypeCollector();
  });

  test('Return event with all mandatory fields', async () =>  {
    const actualEvent = await eventTypeCollector.prepare(originalEvent, 'state');

    expect(actualEvent).toEqual(expectedEvent);
  });


  test('Return correct event type', async () =>  {
    const actualEvent = await eventTypeCollector.prepare(originalEvent, 'state');

    expect(actualEvent.eventType).toEqual(expectedEvent.eventType);
  });

});


