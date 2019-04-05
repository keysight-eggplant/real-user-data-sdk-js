import StopJourneyActionCollector from './StopJourneyActionCollector';

describe('StopJourneyActionCollector', () => {
  test('test collector sets journeyAction stop on event', async () => {
    const collector = new StopJourneyActionCollector();

    const event = await collector.prepare({id: '123-abc-123'});
    expect(event.journeyAction).toBe('stop');
    expect(event.id).toBe('123-abc-123');
  });
});
