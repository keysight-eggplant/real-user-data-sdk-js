export default class WebBackEndCollector {

  constructor() {
    if (typeof window.performance.getEntriesByType !== 'undefined') {
      this.currentPerformanceAPI = window.performance.getEntriesByType('navigation')[0];
    }
    this.oldPerformanceAPI = window.performance;
  }

  /**
     * @param {Event} event
     * @returns {Promise<*>|Event}
     */
  async prepare (event) {
    event.eventDuration1 = WebBackEndCollector.getResponseStart(this.currentPerformanceAPI, this.oldPerformanceAPI);
    return event;
  }

  /**
     *
     * @param {Object} currentPerformanceAPI
     * @param {Object} oldPerformanceAPI
     * @returns {null|Number}
     */
  static getResponseStart(currentPerformanceAPI, oldPerformanceAPI) {
    try {
      if (currentPerformanceAPI) {
        return Math.round(currentPerformanceAPI.responseStart);
      } if (oldPerformanceAPI && oldPerformanceAPI.timing) {
        /** We need to subtract due to the fact that is in EPOCH Time */
        return oldPerformanceAPI.timing.responseStart - oldPerformanceAPI.timing.navigationStart;
      }
      return null;

    }
    catch (e) {
      // Failed to identify data layer
      return null;
    }
  }


}
