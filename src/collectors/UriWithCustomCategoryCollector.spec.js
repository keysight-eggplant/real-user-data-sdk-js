import UriWithCustomCategoryCollector from './UriWithCustomCategoryCollector';

describe('UriWithCustomCategoryCollector', () => {
  const originalEvent = {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
    eventType: 'state',
    eventAction: 'load',
    eventStart: 123456,
    eventEnd: 987654,
    deviceType: 'mobile'
  };

  const expectedEvent = {
    ...originalEvent,
    eventSource: 'http://localhost/',
    eventCategory: 'custom category'
  }
  let uriWithCustomCategoryCollector;


  beforeEach(() => {
    uriWithCustomCategoryCollector = new UriWithCustomCategoryCollector('custom category');
  });

  test('Return event with all mandatory fields', async () =>  {
    const actualEvent = await uriWithCustomCategoryCollector.prepare(originalEvent);

    expect(actualEvent).toEqual(expectedEvent);
  });


  test('Return correct uri and category', async () =>  {
    const actualEvent = await uriWithCustomCategoryCollector.prepare(originalEvent);

    expect(actualEvent.eventSource).toEqual(expectedEvent.eventSource);
    expect(actualEvent.eventCategory).toEqual(expectedEvent.eventCategory);
  });

});


