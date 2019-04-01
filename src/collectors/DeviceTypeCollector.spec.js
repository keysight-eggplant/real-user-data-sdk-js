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
    const userAgentString = 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30';

    navigator.__defineGetter__('userAgent', function(){
      return userAgentString;
    });

    deviceTypeCollector = new DeviceTypeCollector();
  });

  test('Return event with all mandatory fields', async () =>  {
    const actualEvent = await deviceTypeCollector.prepare(originalEvent);

    expect(actualEvent).toEqual(expectedEvent);
  });


  test('Return correct device type', async () =>  {
    const actualEvent = await deviceTypeCollector.prepare(originalEvent);

    expect(actualEvent.deviceType).toEqual(expectedEvent.deviceType);
  });

});


