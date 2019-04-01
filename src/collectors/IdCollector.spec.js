import IdCollector from './IdCollector';

describe('IdCollector', () => {
  const originalEvent = {
    clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
    eventType: 'state',
    eventAction: 'load',
    eventSource: 'products/shoes/1',
    eventCategory: 'products/shoes',
    deviceType: 'mobile'
  };
  const expectedEvent = {
    ...originalEvent,
    id: expect.stringMatching(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/),
  };

  let idCollector;

  beforeEach(() => {
    idCollector = new IdCollector();
  });

  test('Return event with all mandatory fields', async () =>  {
    const actualEvent = await idCollector.prepare(originalEvent);
    expect(actualEvent).toEqual(expectedEvent);
  });


  test('Return correct event timing', async () =>  {
    const actualEvent = await idCollector.prepare(originalEvent);

    expect(actualEvent.id).toEqual(expectedEvent.id);
  });

});


