import { JOURNEY_ACTION } from '../core/constants.js';

export default class StopJourneyActionCollector {
  async prepare(event) {
    event.journeyAction = JOURNEY_ACTION.STOP;
    return event;
  }
}
