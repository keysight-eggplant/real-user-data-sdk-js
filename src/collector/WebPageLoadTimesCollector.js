export default class WebPageLoadTimesCollector {

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
    event.eventDuration2 = WebPageLoadTimesCollector.getDOMInteractive(this.currentPerformanceAPI, this.oldPerformanceAPI);
    event.eventDuration3 = WebPageLoadTimesCollector.getLoadEventStart(this.currentPerformanceAPI, this.oldPerformanceAPI);
    event.eventDuration4 = WebPageLoadTimesCollector.getDOMComplete(this.currentPerformanceAPI, this.oldPerformanceAPI);
    event.eventDuration5 = WebPageLoadTimesCollector.getLoadEventEnd(this.currentPerformanceAPI, this.oldPerformanceAPI);
    return event;
  }


  /**
   *
   * @param {Object} currentPerformanceAPI
   * @param {Object} oldPerformanceAPI
   * @returns {null|Number}
   */
  static getDOMInteractive(currentPerformanceAPI, oldPerformanceAPI) {
    try {
      if (currentPerformanceAPI) {
        return Math.round(currentPerformanceAPI.domInteractive);
      } if (oldPerformanceAPI && oldPerformanceAPI.timing) {
        /** We need to subtract due to the fact that is in EPOCH Time */
        return oldPerformanceAPI.timing.domInteractive - oldPerformanceAPI.timing.navigationStart;
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
   * @param {Object} currentPerformanceAPI
   * @param {Object} oldPerformanceAPI
   * @returns {null|Number}
   */
  static getLoadEventStart(currentPerformanceAPI, oldPerformanceAPI) {
    try {
      if (currentPerformanceAPI) {
        return Math.round(currentPerformanceAPI.loadEventStart);
      } if (oldPerformanceAPI && oldPerformanceAPI.timing) {
        /** We need to subtract due to the fact that is in EPOCH Time */
        return oldPerformanceAPI.timing.loadEventStart - oldPerformanceAPI.timing.navigationStart;
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
   * @param {Object} currentPerformanceAPI
   * @param {Object} oldPerformanceAPI
   * @returns {null|Number}
   */
  static getDOMComplete(currentPerformanceAPI, oldPerformanceAPI) {
    try {
      if (currentPerformanceAPI) {
        return Math.round(currentPerformanceAPI.domComplete);
      } if (oldPerformanceAPI && oldPerformanceAPI.timing) {
        /** We need to subtract due to the fact that is in EPOCH Time */
        return oldPerformanceAPI.timing.domComplete - oldPerformanceAPI.timing.navigationStart;
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
   * @param {Object} currentPerformanceAPI
   * @param {Object} oldPerformanceAPI
   * @returns {null|Number}
   */
  static getLoadEventEnd(currentPerformanceAPI, oldPerformanceAPI) {
    try {
      if (currentPerformanceAPI) {
        return Math.round(currentPerformanceAPI.loadEventEnd);
      } if (oldPerformanceAPI && oldPerformanceAPI.timing) {
        /** We need to subtract due to the fact that is in EPOCH Time */
        return oldPerformanceAPI.timing.loadEventEnd - oldPerformanceAPI.timing.navigationStart;
      }
      return null;

    }
    catch (e) {
      // Failed to identify data layer
      return null;
    }
  }


}
