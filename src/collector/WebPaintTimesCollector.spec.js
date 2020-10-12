import WebPaintTimesCollector from './WebPaintTimesCollector';

describe('WebPaintTimesCollector', () => {
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
  /** @type {Event} */
  const noAPIExpectedEvent = {
    ...originalEvent,
    eventDuration6: null,
    eventDuration7: null
  };
  let webPaintTimesCollector;

  beforeEach(() => {
    global.window.performance = undefined;
  });

  describe('with current Performance API', () => {
    beforeEach(() => {

      global.window.performance.getEntriesByType = jest.fn().mockReturnValueOnce(newPerfAPIResponse);

      webPaintTimesCollector = new WebPaintTimesCollector();
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await webPaintTimesCollector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEvent);
    });


    test('Return correct page load metrics', async () => {
      /** @type {Event} */
      const actualEvent = await webPaintTimesCollector.prepare(originalEvent);

      expect(actualEvent.eventDuration6).toEqual(expectedEvent.eventDuration6);
      expect(actualEvent.eventDuration7).toEqual(expectedEvent.eventDuration7);
    });

    afterEach(() => {

      global.window.performance.getEntriesByType = undefined;

    });
  });

  describe('with no Performance API', () => {
    beforeEach(() => {
      webPaintTimesCollector = new WebPaintTimesCollector();
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await webPaintTimesCollector.prepare(originalEvent);
      expect(actualEvent).toEqual(noAPIExpectedEvent);
    });


    test('Return correct page load metrics', async () => {
      /** @type {Event} */
      const actualEvent = await webPaintTimesCollector.prepare(originalEvent);

      expect(actualEvent.eventDuration6).toEqual(null);
      expect(actualEvent.eventDuration7).toEqual(null);
    });
  });
});
