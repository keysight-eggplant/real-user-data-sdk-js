import SpaTimingCollector from './SpaTimingCollector';

describe('SpaTimingCollector', () => {
  const originalEvent = {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
    eventType: 'state',
    eventAction: 'load',
    eventSource: 'products/shoes/1',
    eventCategory: 'products/shoes',
    deviceType: 'mobile'
  };

  const expectedEvent = {
    ...originalEvent,
    eventStart: expect.any(Number),
    eventEnd: expect.any(Number)
  };
  let spaTimingCollector;


  beforeEach(() => {
    spaTimingCollector = new SpaTimingCollector();
  });

  test('Return event with all mandatory fields', async () => {
    spaTimingCollector.start();
    const actualEvent = await spaTimingCollector.prepare(originalEvent);

    expect(actualEvent).toEqual(expectedEvent);
  });


  test('Return correct event timing', async () => {
    const eventStart = new Date().getTime();
    spaTimingCollector.start();
    const actualEvent = await spaTimingCollector.prepare(originalEvent);

    expect(actualEvent.eventStart).toBeGreaterThanOrEqual(eventStart);
    expect(actualEvent.eventEnd).toBeGreaterThanOrEqual(eventStart);
  });

  test('Return cleared event timing', async () => {
    const eventEnd = new Date().getTime();
    spaTimingCollector.start();
    spaTimingCollector.clear();
    const actualEvent = await spaTimingCollector.prepare(originalEvent);

    expect(actualEvent.eventStart).toBeNull();
    expect(actualEvent.eventEnd).toBeGreaterThanOrEqual(eventEnd);
  });
});
