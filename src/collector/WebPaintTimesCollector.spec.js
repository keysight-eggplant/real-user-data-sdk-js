import Sinon from 'sinon';
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

  /** @type {Event} */
  const expectedEvent = {
    ...originalEvent,
    eventDuration6: 555,
    eventDuration7: 556
  };
  let collector;
  let performanceService;

  describe('with Performance Service', () => {
    beforeEach(() => {
      performanceService = {};
      performanceService.getFirstPaint = Sinon.stub().onCall(0).returns(555);
      performanceService.getFirstContentfulPaint = Sinon.stub().onCall(0).returns(556);
      const performanceFactory = {};
      performanceFactory.create = Sinon.stub().onCall(0).returns(performanceService);
      collector = new WebPaintTimesCollector(performanceFactory);
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await collector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEvent);
    });


    test('Return correct response start', async () => {
      /** @type {Event} */
      const actualEvent = await collector.prepare(originalEvent);

      expect(actualEvent.eventDuration6).toEqual(expectedEvent.eventDuration6);
      expect(actualEvent.eventDuration7).toEqual(expectedEvent.eventDuration7);
    });

    test('Calls performance service', async () => {
      /** @type {Event} */
      await collector.prepare(originalEvent);

      performanceService.getFirstPaint.calledOnceWithExactly();
      performanceService.getFirstContentfulPaint.calledOnceWithExactly();
    });
  });
});
