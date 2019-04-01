import UriWithPathCategoryCollector from './UriWithPathCategoryCollector';

describe('UriWithPathCategoryCollector', () => {
  const originalEvent = {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
    eventType: 'state',
    eventAction: 'load',
    eventSource: 'products/shoes/1',
    eventCategory: 'products/shoes',
    deviceType: 'mobile'
  };

  const expectedEvent = {
    ...originalEvent,
    eventSource: 'http://localhost/',
    eventCategory: '/'
  };
  let uriWithCustomCategoryCollector;


  beforeEach(() => {
    uriWithCustomCategoryCollector = new UriWithPathCategoryCollector();
  });

  test('Return event with all mandatory fields', async () =>  {
    const actualEvent = await uriWithCustomCategoryCollector.prepare(originalEvent);

    expect(actualEvent).toEqual(expectedEvent);
  });


  test('Return correct event timing', async () =>  {
    const actualEvent = await uriWithCustomCategoryCollector.prepare(originalEvent);

    expect(actualEvent.eventSource).toEqual(expectedEvent.eventSource);
    expect(actualEvent.eventCategory).toEqual(expectedEvent.eventCategory);
  });

});


