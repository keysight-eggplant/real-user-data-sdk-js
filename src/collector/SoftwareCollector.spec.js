/* eslint-disable no-restricted-globals */
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

  describe('Valid UA with modified custom value', () => {
    beforeEach(() => {
      const userAgentString = 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30';

      navigator.__defineGetter__('userAgent', () => userAgentString);

      softwareCollector = new SoftwareCollector();
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

      expect(actualEvent.encoding).toEqual('');
    });

    test('Return event with viewportHeight null when it can not find viewportHeight', async () => {
      window.innerHeight = '';
      document.documentElement.__defineGetter__('clientHeight', () => '');
      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.viewportHeight).toEqual(null);
    });

    test('Return event with a new viewportHeight', async () => {
      document.documentElement.__defineGetter__('clientHeight', () => 300);
      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.viewportHeight).toEqual(300);
    });

    test('Return event with empty viewportHeight when clientHeight is not found', async () => {
      window.innerHeight = 200;
      document.documentElement.__defineGetter__('clientHeight', () => '');
      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.viewportHeight).toEqual(200);
    });

    test('Return event with viewportWidth null when it can not find viewportWidth', async () => {
      window.innerWidth = '';
      document.documentElement.__defineGetter__('clientWidth', () => '');
      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.viewportWidth).toEqual(null);
    });

    test('Return event with a new viewportWidth', async () => {
      document.documentElement.__defineGetter__('clientWidth', () => 300);
      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.viewportWidth).toEqual(300);
    });

    test('Return event with empty viewportWidth when clientWidth is not found', async () => {
      window.innerWidth = 200;
      document.documentElement.__defineGetter__('clientWidth', () => '');
      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.viewportWidth).toEqual(200);
    });

    test('Return event with empty language when lang and language are not set', async () => {
      navigator.__defineGetter__('language', () => '');
      document.documentElement.__defineGetter__('lang', () => '');
      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.language).toEqual('');
    });

    test('Return event with new language when lang is empty', async () => {
      navigator.__defineGetter__('language', () => 'fa');
      document.documentElement.__defineGetter__('lang', () => '');
      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.language).toEqual('fa');
    });

    test('Return event with new language when lang is empty', async () => {
      document.documentElement.__defineGetter__('lang', () => 'en-GB');
      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.language).toEqual('en-GB');
    });

  });


  describe('Valid UA with new modified custom value', () => {
    beforeEach(() => {
      const userAgentString = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.75.14 (KHTML, like Gecko) Version/7.0.3 Safari/7046A194A';

      navigator.__defineGetter__('userAgent', () => userAgentString);

      softwareCollector = new SoftwareCollector();
    });


    test('Return event with new browser name', async () => {
      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.softwareInfo1).toEqual('Safari');
    });

    test('Return event with new browser version', async () => {
      const actualEvent = await softwareCollector.prepare(originalEvent);

      expect(actualEvent.softwareInfo2).toEqual('7.0.3');
    });

  });

});
