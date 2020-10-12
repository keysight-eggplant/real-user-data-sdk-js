/* eslint-disable no-restricted-properties */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-globals */

import HardwareCollector from './HardwareCollector';

describe('HardwareCollector', () => {
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
    manufacturer: 'Samsung',
    model: 'SCH-I535',
    screenResolutionWidth: 1920, // this should be modified if we are using Karma
    screenResolutionHeight: 1080 // this should be modified if we are using Karma
  };
  let hardwareCollector;


  describe('Valid UserAgent', () => {
    beforeEach(() => {
      const userAgentString = 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30';

      navigator.__defineGetter__('userAgent', () => userAgentString);

      hardwareCollector = new HardwareCollector();
    });

    test('Return event with all mandatory fields', async () => {
      screen.__defineGetter__('width', () => 1920);
      screen.__defineGetter__('height', () => 1080);
      const actualEvent = await hardwareCollector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEvent);
    });

    test('Return null for resolution when the screen is not available', async () => {
      screen.__defineGetter__('width', () => undefined);
      screen.__defineGetter__('height', () => undefined);
      const actualEvent = await hardwareCollector.prepare(originalEvent);

      expect(actualEvent.screenResolutionWidth).toEqual(null);
      expect(actualEvent.screenResolutionHeight).toEqual(null);
    });
  });

  describe('Invalid UserAgent', () => {
    beforeEach(() => {
      const userAgentString = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36';

      navigator.__defineGetter__('userAgent', () => userAgentString);
      screen.__defineGetter__('width', () => 1920);
      screen.__defineGetter__('height', () => 1080);

      hardwareCollector = new HardwareCollector();
    });

    test('Return event with default manufacturer', async () => {
      const actualEvent = await hardwareCollector.prepare(originalEvent);

      expect(actualEvent.manufacturer).toEqual('');
    });
    test('Return event with default model', async () => {
      const actualEvent = await hardwareCollector.prepare(originalEvent);

      expect(actualEvent.model).toEqual('');
    });
    test('Return event with default screenResolutionWidth', async () => {
      const actualEvent = await hardwareCollector.prepare(originalEvent);

      expect(actualEvent.screenResolutionWidth).toEqual(1920);
    });
    test('Return event with default screenResolutionHeight', async () => {
      const actualEvent = await hardwareCollector.prepare(originalEvent);

      expect(actualEvent.screenResolutionHeight).toEqual(1080);
    });
  });
});
