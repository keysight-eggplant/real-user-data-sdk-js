import PerformanceServiceFactory from '../core/performance/PerformanceServiceFactory';

export default class WebPaintTimesCollector {

  constructor() {
    this.performanceServiceFactory = new PerformanceServiceFactory();
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
