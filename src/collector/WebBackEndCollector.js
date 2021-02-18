import NormalizationHelper from '../core/Normalization.helper';
import PerformanceServiceFactory from '../core/performance/PerformanceServiceFactory';

export default class WebBackEndCollector {

  constructor() {
    this.performanceServiceFactory = new PerformanceServiceFactory();
  }

  /**
     * @param {Event} event
     * @returns {Promise<*>|Event}
     */
  async prepare (event) {
    event.eventDuration1 = this.performanceServiceFactory.create().getResponseStart();
    return event;
  }
}
