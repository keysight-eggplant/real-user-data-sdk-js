import PerformanceService from './PerformanceService';
import NormalizationHelper from '../Normalization.helper';

export default class PerformanceNavigationPaintTimingService extends PerformanceService {
  /**
   * Return the status of the Performance Service
   * @returns {string}
   */
  getStatus() {
    const timings = [
      !!this.getResponseStart(),
      !!this.getDOMInteractive(),
      !!this.getDOMInteractive(),
      !!this.getDOMComplete(),
      !!this.getLoadEventEnd(),
      !!this.getFirstPaint(),
      !!this.getFirstContentfulPaint()
    ];

    if (!timings.filter((i) => { return i === false; }).length) {
      return this.STATUS.COMPLETE;
    }

    return this.STATUS.PENDING;
  }

  /**
   * Return performance navigation data
   * @returns {object}
   */
  getNavigationData() {
    return window.performance.getEntriesByType('navigation')[0];
  }

  /**
   * Return performance paint data
   * @returns {object}
   */
  getPaintData(type) {
    return window.performance.getEntriesByType('paint').filter((i) => {
      return i.name === type;
    })[0];
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getResponseStart() {
    try {
      return NormalizationHelper.normalizeNonZeroPositiveInteger(
        this.getNavigationData().requestStart
      );
    } catch (e) {
      return null;
    }
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getDOMInteractive() {
    try {
      return NormalizationHelper.normalizeNonZeroPositiveInteger(
        this.getNavigationData().domInteractive
      );
    } catch (e) {
      return null;
    }
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getLoadEventStart() {
    try {
      return NormalizationHelper.normalizeNonZeroPositiveInteger(
        this.getNavigationData().loadEventStart
      );
    } catch (e) {
      return null;
    }
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getDOMComplete() {
    try {
      return NormalizationHelper.normalizeNonZeroPositiveInteger(
        this.getNavigationData().domComplete
      );
    } catch (e) {
      return null;
    }
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getLoadEventEnd() {
    try {
      return NormalizationHelper.normalizeNonZeroPositiveInteger(
        this.getNavigationData().loadEventEnd
      );
    } catch (e) {
      return null;
    }
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getFirstPaint() {
    try {
      return NormalizationHelper.normalizeNonZeroPositiveInteger(
        this.getPaintData('first-paint').startTime
      );
    } catch (e) {
      return null;
    }
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getFirstContentfulPaint() {
    try {
      console.log(NormalizationHelper.normalizeNonZeroPositiveInteger(this.getPaintData('first-paint').startTime));
      return NormalizationHelper.normalizeNonZeroPositiveInteger(
        this.getPaintData('first-contentful-paint').startTime
      );
    } catch (e) {
      return null;
    }
  }
}
