import EventActionCollector from './EventActionCollector';

describe('EventActionCollector', () => {
  const originalEvent = {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
    eventType: 'state',
    eventSource: 'products/shoes/1',
    eventCategory: 'products/shoes',
    eventStart: 123,
    eventEnd: 456
  };

  const expectedEvent = {
    ...originalEvent,
    eventAction: 'double-click'
  }
  let eventActionCollector;


  beforeEach(() => {
    eventActionCollector = new EventActionCollector('double-click');
  });

  test('Return event with all mandatory fields', async () =>  {
    const actualEvent = await eventActionCollector.prepare(originalEvent);

    expect(actualEvent).toEqual(expectedEvent);
  });


  test('Return correct event action', async () =>  {
    const actualEvent = await eventActionCollector.prepare(originalEvent);

    expect(actualEvent.eventAction).toEqual(expectedEvent.eventAction);
  });

});


