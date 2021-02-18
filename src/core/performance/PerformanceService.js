export default class PerformanceService {

  STATUS = {
    PENDING: 1,
    COMPLETE: 2,
    FAILED: 3
  }

  /**
   * Return the status of the Performance Service
   * @returns {string}
   */
  getStatus() {
    return this.STATUS.COMPLETE;
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getResponseStart() {
    return null;
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getDOMInteractive() {
    return null;
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getLoadEventStart() {
    return null;
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getDOMComplete() {
    return null;
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getLoadEventEnd() {
    return null;
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getFirstPaint() {
    return null;
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getFirstContentfulPaint() {
    return null;
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getLargestContentfulPaint() {
    return null;
  }

}
