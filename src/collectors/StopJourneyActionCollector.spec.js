import StopJourneyActionCollector from './StopJourneyActionCollector';

describe("StopJourneyActionCollector", () => {
  test("test collector sets journeyAction stop on event", async () => {
    let collector = new StopJourneyActionCollector();

    let event = await collector.prepare({id:"123-abc-123"});
    expect(event.journeyAction).toBe("stop");
    expect(event.id).toBe("123-abc-123");
  });
});