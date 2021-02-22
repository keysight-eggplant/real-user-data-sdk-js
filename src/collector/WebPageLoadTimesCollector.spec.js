import Sinon from 'sinon';
import WebPageLoadTimesCollector from './WebPageLoadTimesCollector';

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

  /** @type {Event} */
  const expectedEvent = {
    ...originalEvent,
    eventDuration2: 555,
    eventDuration3: 556,
    eventDuration4: 557,
    eventDuration5: 558
  };
  let collector;
  let performanceService;

  describe('with Performance Service', () => {
    beforeEach(() => {
      performanceService = {};
      performanceService.getDOMInteractive = Sinon.stub().onCall(0).returns(555);
      performanceService.getLoadEventStart = Sinon.stub().onCall(0).returns(556);
      performanceService.getDOMComplete = Sinon.stub().onCall(0).returns(557);
      performanceService.getLoadEventEnd = Sinon.stub().onCall(0).returns(558);
      const performanceFactory = {};
      performanceFactory.create = Sinon.stub().onCall(0).returns(performanceService);
      collector = new WebPageLoadTimesCollector(performanceFactory);
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await collector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEvent);
    });


    test('Return correct response start', async () => {
      /** @type {Event} */
      const actualEvent = await collector.prepare(originalEvent);

      expect(actualEvent.eventDuration2).toEqual(expectedEvent.eventDuration2);
      expect(actualEvent.eventDuration3).toEqual(expectedEvent.eventDuration3);
      expect(actualEvent.eventDuration4).toEqual(expectedEvent.eventDuration4);
      expect(actualEvent.eventDuration5).toEqual(expectedEvent.eventDuration5);
    });

    test('Calls performance service', async () => {
      /** @type {Event} */
      await collector.prepare(originalEvent);

      performanceService.getDOMInteractive.calledOnceWithExactly();
      performanceService.getLoadEventStart.calledOnceWithExactly();
      performanceService.getDOMComplete.calledOnceWithExactly();
      performanceService.getLoadEventEnd.calledOnceWithExactly();
    });
  });
});
