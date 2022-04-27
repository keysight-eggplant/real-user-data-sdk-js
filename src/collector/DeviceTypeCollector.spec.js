/* eslint-disable no-restricted-properties */
/* eslint-disable no-underscore-dangle */

import DeviceTypeCollector from './DeviceTypeCollector.js';

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
  };
  let deviceTypeCollector;

  describe('Valid UA', () => {
    beforeEach(() => {
      const userAgentString = 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30';

      navigator.__defineGetter__('userAgent', () => userAgentString);

      deviceTypeCollector = new DeviceTypeCollector();
    });

    test('Return event with all mandatory fields', async () => {
      const actualEvent = await deviceTypeCollector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEvent);
    });

    test('Return correct device type', async () => {
      const actualEvent = await deviceTypeCollector.prepare(originalEvent);

      expect(actualEvent.deviceType).toEqual(expectedEvent.deviceType);
    });
  });

  describe('Invalid UA', () => {
    beforeEach(() => {
      const userAgentString = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36';

      navigator.__defineGetter__('userAgent', () => userAgentString);

      deviceTypeCollector = new DeviceTypeCollector();
    });

    test('Return event with all mandatory fields', async () => {
      const actualEvent = await deviceTypeCollector.prepare(originalEvent);

      expect(actualEvent.deviceType).toEqual('PC');
    });
  });
});
