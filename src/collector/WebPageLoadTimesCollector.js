import PerformanceServiceFactory from '../core/performance/PerformanceServiceFactory.js';

export default class WebPageLoadTimesCollector {

  /**
   * @param {PerformanceService} performanceServiceFactory
   */
  constructor(performanceServiceFactory) {
    // Optional
    if (performanceServiceFactory) {
      this.performanceServiceFactory = performanceServiceFactory;
    } else {
      this.performanceServiceFactory = new PerformanceServiceFactory();
    }
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
