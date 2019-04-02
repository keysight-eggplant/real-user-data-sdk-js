import ErrorCollector from './ErrorCollector';

describe('ErrorCollector', () => {
  const originalEvent = {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
    eventAction: 'load',
    eventSource: 'products/shoes/1',
    eventCategory: 'products/shoes',
    eventStart: 123,
    eventEnd: 456,
    eventType: 'state'
  };

  const expectedEvent = {
    ...originalEvent,
    errorCode: '404',
    errorType: 'Not Found',
    errorFatal: true
  };
  let errorCollector;


  beforeEach(() => {
    errorCollector = new ErrorCollector('404', 'Not Found', true);
  });

  test('Return event with all mandatory fields', async () =>  {
    const actualEvent = await errorCollector.prepare(originalEvent);

    expect(actualEvent).toEqual(expectedEvent);
  });


  test('Return correct error properties', async () =>  {
    const actualEvent = await errorCollector.prepare(originalEvent);

    expect(actualEvent.errorCode).toEqual(expectedEvent.errorCode);
    expect(actualEvent.errorType).toEqual(expectedEvent.errorType);
    expect(actualEvent.errorFatal).toEqual(expectedEvent.errorFatal);
  });

});


