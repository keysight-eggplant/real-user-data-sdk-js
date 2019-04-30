/* eslint-disable no-restricted-properties */
/* eslint-disable no-underscore-dangle */

import SoftwareCollector from './SoftwareCollector';

describe('SoftwareCollector', () => {
  const originalEvent = {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
    eventType: 'state',
    eventAction: 'load',
    eventSource: 'products/shoes/1',
    eventCategory: 'products/shoes',
    eventStart: 123,
    eventEnd: 456,
    deviceType: 'mobile',
  };

  const expectedEvent = {
    ...originalEvent,
    encoding: 'UTF-8',
    language: 'en-US',
    osName: 'Android',
    osVersion: '4.4.2',
    screenColors: 24,
    softwareInfo1: 'Android Browser',
    softwareInfo2: '4.0',
    viewportHeight: 768,
    viewportWidth: 1024,
  };
  let softwareCollector;


  describe('Valid UA', () => {
    beforeEach(() => {
      const userAgentString = 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30';

      navigator.__defineGetter__('userAgent', () => userAgentString);

      softwareCollector = new SoftwareCollector();
    });

    test('Return event with all mandatory fields', async () => {
      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEvent);
    });

    test('Return correct values for this collector', async () => {
      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.encoding).toEqual(expectedEvent.encoding);
      expect(actualEvent.language).toEqual(expectedEvent.language);
      expect(actualEvent.osName).toEqual(expectedEvent.osName);
      expect(actualEvent.screenColors).toEqual(expectedEvent.screenColors);
      expect(actualEvent.softwareInfo1).toEqual(expectedEvent.softwareInfo1);
      expect(actualEvent.softwareInfo2).toEqual(expectedEvent.softwareInfo2);
      expect(actualEvent.viewportHeight).toEqual(expectedEvent.viewportHeight);
      expect(actualEvent.viewportWidth).toEqual(expectedEvent.viewportWidth);
    });
  });

  describe('Valid UA with modified custome value', () => {
    beforeEach(() => {
      const userAgentString = 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30';

      navigator.__defineGetter__('userAgent', () => userAgentString);

      softwareCollector = new SoftwareCollector();
    });

    test('Return event with new encoding', async () => {
      document.__defineGetter__('inputEncoding', () => 'UTF-32');

      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.encoding).toEqual('UTF-32');
    });

    test('Return event with new encoding when inputEncoding is empty', async () => {
      document.__defineGetter__('inputEncoding', () => '');
      document.__defineGetter__('characterSet', () => 'UTF-16');

      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.encoding).toEqual('UTF-16');
    });

    test('Return event with new encoding when inputEncoding and characterSet are empty', async () => {
      document.__defineGetter__('inputEncoding', () => '');
      document.__defineGetter__('characterSet', () => '');
      document.__defineGetter__('charset', () => 'ASCII');

      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.encoding).toEqual('ASCII');
    });

    test('Return event with new encoding when only defaultCharset is set', async () => {
      document.__defineGetter__('inputEncoding', () => '');
      document.__defineGetter__('characterSet', () => '');
      document.__defineGetter__('charset', () => '');
      document.__defineGetter__('defaultCharset', () => 'EUC-KR');

      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.encoding).toEqual('EUC-KR');
    });

    test('Return event with empty encoding when it can not find encoding', async () => {
      document.__defineGetter__('inputEncoding', () => '');
      document.__defineGetter__('characterSet', () => '');
      document.__defineGetter__('charset', () => '');
      document.__defineGetter__('defaultCharset', () => '');

      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.encoding).toEqual(' ');
    });

    test('Return correct values for this collector', async () => {
      const actualEvent = await softwareCollector.prepare(originalEvent);

      // expect(actualEvent.encoding).toEqual(expectedEvent.encoding);
      expect(actualEvent.language).toEqual(expectedEvent.language);
      expect(actualEvent.osName).toEqual(expectedEvent.osName);
      expect(actualEvent.screenColors).toEqual(expectedEvent.screenColors);
      expect(actualEvent.softwareInfo1).toEqual(expectedEvent.softwareInfo1);
      expect(actualEvent.softwareInfo2).toEqual(expectedEvent.softwareInfo2);
      expect(actualEvent.viewportHeight).toEqual(expectedEvent.viewportHeight);
      expect(actualEvent.viewportWidth).toEqual(expectedEvent.viewportWidth);
    });
  });

  // describe('Invalid UA', () => {
  //   beforeEach(() => {
  //     const userAgentString = '--Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36';

  //     navigator.__defineGetter__('userAgent', () => userAgentString);

  //     softwareCollector = new SoftwareCollector();
  //   });

  //   test('Return event with all mandatory fields', async () => {
  //     const actualEvent = await softwareCollector.prepare(originalEvent);

  //     expect(actualEvent.encoding).toEqual('UTF-8');
  //   });
  // });
});
