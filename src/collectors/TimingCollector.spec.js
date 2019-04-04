import TimingCollector from './TimingCollector';

describe('TimingCollector', () => {
  const originalEvent = {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
    eventType: 'state',
    eventAction: 'load',
    eventSource: 'products/shoes/1',
    eventCategory: 'products/shoes',
    deviceType: 'mobile',
  };

  const expectedEvent = {
    ...originalEvent,
    eventStart: 123,
    eventEnd: expect.any(Number)
  };
  let timingCollector;


  beforeEach(() => {
    global.window.performance.timing = {
      navigationStart: 123,
    };

    timingCollector = new TimingCollector();
  });

  test('Return event with all mandatory fields', async () => {
    const actualEvent = await timingCollector.prepare(originalEvent);

    expect(actualEvent).toEqual(expectedEvent);
  });


  test('Return correct event timing', async () => {
    const eventEnd = new Date().getTime();
    const actualEvent = await timingCollector.prepare(originalEvent);

    expect(actualEvent.eventStart).toEqual(expectedEvent.eventStart);
    expect(actualEvent.eventEnd).toBeGreaterThanOrEqual(eventEnd);
  });
});
