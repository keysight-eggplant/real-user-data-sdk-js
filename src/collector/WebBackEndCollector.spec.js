import Sinon from 'sinon';
import WebBackEndCollector from './WebBackEndCollector';

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

  /** @type {Event} */
  const expectedEvent = {
    ...originalEvent,
    eventDuration1: 555
  };
  let collector;
  let performanceService;

  describe('with Performance Service', () => {
    beforeEach(() => {
      performanceService = {};
      performanceService.getResponseStart = Sinon.stub().onCall(0).returns(555);
      const performanceFactory = {};
      performanceFactory.create = Sinon.stub().onCall(0).returns(performanceService);
      collector = new WebBackEndCollector(performanceFactory);
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await collector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEvent);
    });

    test('Return correct response start', async () => {
      /** @type {Event} */
      const actualEvent = await collector.prepare(originalEvent);

      expect(actualEvent.eventDuration1).toEqual(expectedEvent.eventDuration1);
    });

    test('Calls performance service', async () => {
      /** @type {Event} */
      await collector.prepare(originalEvent);

      performanceService.getResponseStart.calledOnceWithExactly();
    });
  });
});
