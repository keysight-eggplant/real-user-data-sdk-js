import PerformanceServiceFactory from '../core/performance/PerformanceServiceFactory.js';

export default class WebPaintTimesCollector {

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
    event.eventDuration6 = performanceService.getFirstPaint();
    event.eventDuration7 = performanceService.getFirstContentfulPaint();
    return event;
  }
}
