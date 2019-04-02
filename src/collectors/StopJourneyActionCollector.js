export default class StopJourneyActionCollector {
  async prepare(event) {
    event.journeyAction = "stop";
    return event;
  }
}