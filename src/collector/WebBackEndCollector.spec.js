import WebBackEndCollector from './WebBackEndCollector.js';

describe('WebBackEndCollector', () => {
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
      responseStart: 555.21
    }
  ];

  /** @type {Event} */
  const expectedEvent = {
    ...originalEvent,
    eventDuration1: 555
  };
  /** @type {Event} */
  const noAPIExpectedEvent = {
    ...originalEvent,
    eventDuration1: null
  };
  let webBackEndCollector;

  beforeEach(() => {
    global.window.performance = undefined;
  });

  describe('with current Performance API', () => {
    beforeEach(() => {

      global.window.performance.getEntriesByType = jest.fn().mockReturnValueOnce(newPerfAPIResponse);

      webBackEndCollector = new WebBackEndCollector();
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await webBackEndCollector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEvent);
    });


    test('Return correct response start', async () => {
      /** @type {Event} */
      const actualEvent = await webBackEndCollector.prepare(originalEvent);

      expect(actualEvent.eventDuration1).toEqual(expectedEvent.eventDuration1);
    });

    afterEach(() => {

      global.window.performance.getEntriesByType = undefined;

    });
  });

  describe('with old Performance API', () => {
    beforeEach(() => {

      global.window.performance.timing = {
        navigationStart: 1601621586412,
        responseStart: 1601621586967
      };

      webBackEndCollector = new WebBackEndCollector();
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await webBackEndCollector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEvent);
    });


    test('Return correct response start', async () => {
      /** @type {Event} */
      const actualEvent = await webBackEndCollector.prepare(originalEvent);

      expect(actualEvent.eventDuration1).toEqual(expectedEvent.eventDuration1);
    });

    afterEach(() => {

      global.window.performance.timing = undefined;

    });
  });

  describe('with no Performance API', () => {
    beforeEach(() => {
      webBackEndCollector = new WebBackEndCollector();
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await webBackEndCollector.prepare(originalEvent);
      expect(actualEvent).toEqual(noAPIExpectedEvent);
    });


    test('Return correct response start', async () => {
      /** @type {Event} */
      const actualEvent = await webBackEndCollector.prepare(originalEvent);

      expect(actualEvent.eventDuration1).toEqual(null);
    });
  });
});
