import NormalizationHelper from '../core/Normalization.helper';
import PerformanceServiceFactory from '../core/performance/PerformanceServiceFactory';

export default class WebPageLoadTimesCollector {

  constructor() {
    this.performanceServiceFactory = new PerformanceServiceFactory();
  }

  /**
     * @param {Event} event
     * @returns {Promise<*>|Event}
     */
  async prepare (event) {
    const performanceService = this.performanceServiceFactory.create();
    event.eventDuration2 = performanceService.getDOMInteractive();
    event.eventDuration3 = performanceService.getLoadEventStart();
    event.eventDuration4 = performanceService.getDOMComplete();
    event.eventDuration5 = performanceService.getLoadEventEnd();
    return event;
  }
}
