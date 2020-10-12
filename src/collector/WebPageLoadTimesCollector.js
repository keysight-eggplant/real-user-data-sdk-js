export default class WebPageLoadTimesCollector {

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
    event.eventDuration2 = this.getDOMInteractive();
    event.eventDuration3 = this.getLoadEventStart();
    event.eventDuration4 = this.getDOMComplete();
    event.eventDuration5 = this.getLoadEventEnd();
    return event;
  }


  /**
   * @returns {null|Number}
   */
  getDOMInteractive() {
    try {
      if (this.currentPerformanceAPI) {
        return Math.round(this.currentPerformanceAPI.domInteractive);
      } if (this.oldPerformanceAPI && this.oldPerformanceAPI.timing) {
        /** We need to subtract due to the fact that is in EPOCH Time */
        return this.oldPerformanceAPI.timing.domInteractive - this.oldPerformanceAPI.timing.navigationStart;
      }
      return null;

    }
    catch (e) {
      // Failed to identify data layer
      return null;
    }
  }

  /**
   * @returns {null|Number}
   */
  getLoadEventStart() {
    try {
      if (this.currentPerformanceAPI) {
        return Math.round(this.currentPerformanceAPI.loadEventStart);
      } if (this.oldPerformanceAPI && this.oldPerformanceAPI.timing) {
        /** We need to subtract due to the fact that is in EPOCH Time */
        return this.oldPerformanceAPI.timing.loadEventStart - this.oldPerformanceAPI.timing.navigationStart;
      }
      return null;

    }
    catch (e) {
      // Failed to identify data layer
      return null;
    }
  }

  /**
   * @returns {null|Number}
   */
  getDOMComplete() {
    try {
      if (this.currentPerformanceAPI) {
        return Math.round(this.currentPerformanceAPI.domComplete);
      } if (this.oldPerformanceAPI && this.oldPerformanceAPI.timing) {
        /** We need to subtract due to the fact that is in EPOCH Time */
        return this.oldPerformanceAPI.timing.domComplete - this.oldPerformanceAPI.timing.navigationStart;
      }
      return null;

    }
    catch (e) {
      // Failed to identify data layer
      return null;
    }
  }

  /**
   *
   * @returns {null|Number}
   */
  getLoadEventEnd() {
    try {
      if (this.currentPerformanceAPI) {
        return Math.round(this.currentPerformanceAPI.loadEventEnd);
      } if (this.oldPerformanceAPI && this.oldPerformanceAPI.timing) {
        /** We need to subtract due to the fact that is in EPOCH Time */
        return this.oldPerformanceAPI.timing.loadEventEnd - this.oldPerformanceAPI.timing.navigationStart;
      }
      return null;

    }
    catch (e) {
      // Failed to identify data layer
      return null;
    }
  }


}
