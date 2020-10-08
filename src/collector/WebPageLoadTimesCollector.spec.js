import WebPageLoadTimesCollector from './WebPageLoadTimesCollector.js';

describe('WebPageLoadTimesCollector', () => {
  const originalEvent = {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
    eventType: 'state',
    eventAction: 'load',
    eventSource: 'products/shoes/1',
    eventCategory: 'products/shoes',
    deviceType: 'mobile'
  };

  const newPerfAPIResponse = [
    {
      domInteractive: 1186,
      loadEventStart: 2531,
      domComplete: 2588,
      loadEventEnd: 2603
    }
  ];

  const navTimingResponse = {
    navigationStart: 1601621586412,
    domInteractive: 1601621587598,
    loadEventStart: 1601621588943,
    domComplete: 1601621589000,
    loadEventEnd: 1601621589015
  };

  /** @type {Event} */
  const expectedEvent = {
    ...originalEvent,
    eventDuration2: 1186,
    eventDuration3: 2531,
    eventDuration4: 2588,
    eventDuration5: 2603,
  };

  /** @type {Event} */
  const noAPIExpectedEvent = {
    ...originalEvent,
    eventDuration2: null,
    eventDuration3: null,
    eventDuration4: null,
    eventDuration5: null,
  };
  let webPageLoadTimesCollector;

  beforeEach(() => {
    global.window.performance = undefined;
  });

  describe('with current Performance API', () => {
    beforeEach(() => {

      global.window.performance.getEntriesByType = jest.fn().mockReturnValueOnce(newPerfAPIResponse);

      webPageLoadTimesCollector = new WebPageLoadTimesCollector();
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await webPageLoadTimesCollector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEvent);
    });


    test('Return correct page load metrics', async () => {
      /** @type {Event} */
      const actualEvent = await webPageLoadTimesCollector.prepare(originalEvent);

      expect(actualEvent.eventDuration2).toEqual(expectedEvent.eventDuration2);
      expect(actualEvent.eventDuration3).toEqual(expectedEvent.eventDuration3);
      expect(actualEvent.eventDuration4).toEqual(expectedEvent.eventDuration4);
      expect(actualEvent.eventDuration5).toEqual(expectedEvent.eventDuration5);
    });

    afterEach(() => {

      global.window.performance.getEntriesByType = undefined;

    });
  });

  describe('with old Performance API', () => {
    beforeEach(() => {

      global.window.performance.timing = navTimingResponse;

      webPageLoadTimesCollector = new WebPageLoadTimesCollector();
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await webPageLoadTimesCollector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEvent);
    });


    test('Return correct page load metrics', async () => {
      /** @type {Event} */
      const actualEvent = await webPageLoadTimesCollector.prepare(originalEvent);

      expect(actualEvent.eventDuration2).toEqual(expectedEvent.eventDuration2);
      expect(actualEvent.eventDuration3).toEqual(expectedEvent.eventDuration3);
      expect(actualEvent.eventDuration4).toEqual(expectedEvent.eventDuration4);
      expect(actualEvent.eventDuration5).toEqual(expectedEvent.eventDuration5);
    });

    afterEach(() => {

      global.window.performance.timing = undefined;

    });
  });

  describe('with no Performance API', () => {
    beforeEach(() => {
      webPageLoadTimesCollector = new WebPageLoadTimesCollector();
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await webPageLoadTimesCollector.prepare(originalEvent);
      expect(actualEvent).toEqual(noAPIExpectedEvent);
    });


    test('Return correct page load metrics', async () => {
      /** @type {Event} */
      const actualEvent = await webPageLoadTimesCollector.prepare(originalEvent);

      expect(actualEvent.eventDuration2).toEqual(null);
      expect(actualEvent.eventDuration3).toEqual(null);
      expect(actualEvent.eventDuration4).toEqual(null);
      expect(actualEvent.eventDuration5).toEqual(null);
    });
  });
});
