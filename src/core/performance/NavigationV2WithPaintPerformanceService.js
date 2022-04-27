import NormalizationHelper from '../Normalization.helper.js';
import NavigationV2PerformanceService from './NavigationV2PerformanceService.js';

export default class NavigationV2WithPaintPerformanceService
  extends NavigationV2PerformanceService {
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

    if (!timings.filter((i) => i === false).length) {
      return this.STATUS.COMPLETE;
    }

    return this.STATUS.PENDING;
  }

  /**
   * Return performance paint data
   * @returns {object}
   */
  getPaintData(type) {
    return window.performance.getEntriesByType('paint').filter((i) => i.name === type)[0];
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
      return NormalizationHelper.normalizeNonZeroPositiveInteger(
        this.getPaintData('first-contentful-paint').startTime
      );
    } catch (e) {
      return null;
    }
  }
}
