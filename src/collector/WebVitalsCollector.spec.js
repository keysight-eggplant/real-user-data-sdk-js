import WebVitalsCollector from './WebVitalsCollector.js';

describe('WebVitalsCollector', () => {
  const originalEvent = {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
    eventType: 'state',
    eventAction: 'load',
    eventSource: 'products/shoes/1',
    eventCategory: 'products/shoes',
    deviceType: 'mobile'
  };

  const newPerfAPIResponse = [{
    name: 'first-paint', startTime: 951.8949999999131
  }, {
    name: 'first-contentful-paint', startTime: 961.8949999999131
  }];

  /** @type {Event} */
  const expectedEvent = {
    ...originalEvent,
    eventDuration6: 952,
    eventDuration7: 962
  };
  let webVitalsCollector;

  beforeEach(() => {
    global.window.performance = undefined;
  });

  describe('with current Web Vitals API', () => {
    beforeEach(() => {

      // global.getCLS = jest.fn().mockReturnValueOnce(444);

      webVitalsCollector = new WebVitalsCollector();
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await webVitalsCollector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEvent);
    });


    test('Return correct page load metrics', async () => {
      /** @type {Event} */
      const actualEvent = await webVitalsCollector.prepare(originalEvent);

      expect(actualEvent.eventDuration6).toEqual(expectedEvent.eventDuration6);
      expect(actualEvent.eventDuration7).toEqual(expectedEvent.eventDuration7);
    });

    afterEach(() => {

      global.window.performance.getEntriesByType = undefined;

    });
  });

  describe('with no Web Vitals API', () => {
    beforeEach(() => {
      webVitalsCollector = new WebVitalsCollector();
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await webVitalsCollector.prepare(originalEvent);
      const choppedActual = JSON.parse(JSON.stringify(actualEvent));
      delete choppedActual.eventDuration6;
      delete choppedActual.eventDuration7;
      const choppedExpected = JSON.parse(JSON.stringify(expectedEvent));
      delete choppedExpected.eventDuration6;
      delete choppedExpected.eventDuration7;
      expect(choppedActual).toEqual(choppedExpected);
    });


    test('Return correct page load metrics', async () => {
      /** @type {Event} */
      const actualEvent = await webVitalsCollector.prepare(originalEvent);

      expect(actualEvent.eventDuration6).toEqual(null);
      expect(actualEvent.eventDuration7).toEqual(null);
    });
  });
});
