import PerformanceServiceFactory from '../core/performance/PerformanceServiceFactory';

export default class WebBackEndCollector {

  /**
   * @param {PerformanceService} performanceServiceFactory
   */
  constructor(performanceServiceFactory) {
    // Optional for backwards-compatibility
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
    event.eventDuration1 = performanceService.getResponseStart();
    return event;
  }
}
