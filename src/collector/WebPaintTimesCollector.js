import NormalizationHelper from '../core/Normalization.helper';

export default class WebPaintTimesCollector {

  constructor() {
    this.currentPerformanceAPI = false;
    if (typeof window.performance.getEntriesByType !== 'undefined') {
      this.currentPerformanceAPI = window.performance.getEntriesByType('paint');
    }
  }

  /**
     * @param {Event} event
     * @returns {Promise<*>|Event}
     */
  async prepare (event) {

    event.eventDuration6 = NormalizationHelper.normalizeNonZeroPositiveInteger(this.getFirstPaint());
    event.eventDuration7 = NormalizationHelper.normalizeNonZeroPositiveInteger(this.getFirstContentfulPaint());
    return event;
  }


  /**
   * @returns {null|Number}
   */
  getFirstPaint() {
    try {
      if (this.currentPerformanceAPI) {
        const firstPaint = WebPaintTimesCollector.getPaint(this.currentPerformanceAPI, 'first-paint');
        return firstPaint;
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
  getFirstContentfulPaint() {
    try {
      if (this.currentPerformanceAPI) {
        return WebPaintTimesCollector.getPaint(this.currentPerformanceAPI, 'first-contentful-paint');
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
