import NormalizationHelper from '../core/Normalization.helper';

export default class WebBackEndCollector {

  constructor() {
    if (typeof window.performance.getEntriesByType !== 'undefined') {
      [this.currentPerformanceAPI] = window.performance.getEntriesByType('navigation');
    }
    this.oldPerformanceAPI = window.performance;
  }

  /**
     * @param {Event} event
     * @returns {Promise<*>|Event}
     */
  async prepare (event) {
    event.eventDuration1 = NormalizationHelper.normalizeNonZeroPositiveInteger(this.getResponseStart());
    return event;
  }

  /**
     *
     * @returns {null|Number}
     */
  getResponseStart() {
    try {
      if (this.currentPerformanceAPI) {
        return Math.round(this.currentPerformanceAPI.responseStart);
      } if (this.oldPerformanceAPI && this.oldPerformanceAPI.timing) {
        /** We need to subtract due to the fact that is in EPOCH Time */
        return this.oldPerformanceAPI.timing.responseStart - this.oldPerformanceAPI.timing.navigationStart;
      }
      return null;

    }
    catch (e) {
      // Failed to identify data layer
      return null;
    }
  }


}
