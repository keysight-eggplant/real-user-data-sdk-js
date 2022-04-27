import {createSandbox} from 'sinon';
import UserAgentCollector from './UserAgentCollector.js';

describe('UserAgentCollector', () => {
  const originalEvent = {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
    eventType: 'state',
    eventAction: 'load',
    eventSource: 'products/shoes/1',
    eventCategory: 'products/shoes',
    deviceType: 'mobile'
  };

  const ua = 'Chrome: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36';

  /** @type {Event} */
  const expectedEvent = {
    ...originalEvent,
    softwareInfo4: ua
  };
  let collector;
  let sandbox;

  describe('with user agent from nav', () => {
    beforeEach(() => {
      sandbox = createSandbox();
      sandbox.stub(navigator, 'userAgent').value(ua);
      collector = new UserAgentCollector();
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await collector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEvent);
    });

    test('Return correct userAgent', async () => {
      /** @type {Event} */
      const actualEvent = await collector.prepare(originalEvent);
      expect(actualEvent.softwareInfo4).toEqual(expectedEvent.softwareInfo4);
    });

    afterEach(() => {
      sandbox.restore();
    });
  });
});
