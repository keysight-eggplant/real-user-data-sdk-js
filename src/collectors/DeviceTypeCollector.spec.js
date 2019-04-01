import DeviceTypeCollector from './DeviceTypeCollector';

describe('DeviceTypeCollector', () => {
  const originalEvent = {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
    eventType: 'state',
    eventAction: 'load',
    eventSource: 'products/shoes/1',
    eventCategory: 'products/shoes',
    eventStart: 123,
    eventEnd: 456
  };

  const expectedEvent = {
    ...originalEvent,
    deviceType: 'mobile'
  }
  let deviceTypeCollector;


  beforeEach(() => {
    deviceTypeCollector = new DeviceTypeCollector();
  });

  test('Return event with all mandatory fields', async () =>  {
    const actualEvent = await deviceTypeCollector.prepare(originalEvent, 'mobile');

    expect(actualEvent).toEqual(expectedEvent);
  });


  test('Return correct event timing', async () =>  {
    const actualEvent = await deviceTypeCollector.prepare(originalEvent, 'mobile');

    expect(actualEvent.deviceType).toEqual(expectedEvent.deviceType);
  });

});


