import {getCLS, getFID, getLCP} from 'web-vitals';

export default class WebVitalsCollector {

  constructor() {
    if (typeof window.performance.getEntriesByType !== 'undefined') {
      this.currentPerformanceAPI = performance.getEntriesByType('paint');
    }
  }

  /**
     * @param {Event} event
     * @returns {Promise<*>|Event}
     */
  async prepare (event) {

    console.log('here1');
    var x = 3;
    getCLS(WebVitalsCollector.populateCallback);
    getFID(WebVitalsCollector.populateCallback);
    getLCP(WebVitalsCollector.populateCallback);

    console.log('here2');
    return event;
  }


  static populateCallback(metric) {
    console.log(metric);
  }

}
