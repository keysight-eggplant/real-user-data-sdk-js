export default class WebPaintTimesCollector {

  /**
     * @param {Event} event
     * @returns {Promise<*>|Event}
     */
  async prepare (event) {
    let currentPerformanceAPI = false;

    if (typeof window.performance.getEntriesByType !== 'undefined') {
      currentPerformanceAPI = window.performance.getEntriesByType('paint');
    }

    event.eventDuration6 = WebPaintTimesCollector.getFirstPaint(currentPerformanceAPI);
    event.eventDuration7 = WebPaintTimesCollector.getFirstContentfulPaint(currentPerformanceAPI);
    return event;
  }


  /**
   *
   * @param {Object} currentPerformanceAPI
   * @returns {null|Number}
   */
  static getFirstPaint(currentPerformanceAPI) {
    try {
      if (currentPerformanceAPI) {
        const firstPaint = WebPaintTimesCollector.getPaint(currentPerformanceAPI, 'first-paint');
        console.log(firstPaint);
        return Math.round(firstPaint);
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
   * @returns {null|Number}
   */
  static getFirstContentfulPaint(currentPerformanceAPI) {
    try {
      if (currentPerformanceAPI) {
        return Math.round(WebPaintTimesCollector.getPaint(currentPerformanceAPI, 'first-contentful-paint'));
      }
      return null;

    }
    catch (e) {
      // Failed to identify data layer
      return null;
    }
  }

  /**
   * Helper function to destructure the paint times collection structure
   * @param PaintAPI
   * @param paintTypeName
   * @returns {*}
   */
  static getPaint(PaintAPI, paintTypeName) {


    for (let i = 0; i < PaintAPI.length; i++) {
      if (PaintAPI[i].name === paintTypeName) {
        return PaintAPI[i].startTime;
      }
    }


    return null;
  }

}
