import PerformanceService from './PerformanceService';
import NormalizationHelper from '../Normalization.helper';

export default class NavigationV1PerformanceService extends PerformanceService {
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
      !!this.getLoadEventEnd()
    ];

    if (!timings.filter((i) => i === false).length) {
      return this.STATUS.COMPLETE;
    }

    return this.STATUS.PENDING;
  }

  /**
   * Return performance navigation data
   * @returns {object}
   */
  getNavigationData() {
    return window.performance.timing;
  }

  /**
   * Return timing duration
   * @returns {number|null}
   */
  getResponseStart() {
    try {
      return NormalizationHelper.normalizeNonZeroPositiveInteger(
        this.getNavigationData().responseStart - this.getNavigationData().navigationStart
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
        this.getNavigationData().domInteractive - this.getNavigationData().navigationStart
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
        this.getNavigationData().loadEventStart - this.getNavigationData().navigationStart
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
        this.getNavigationData().domComplete - this.getNavigationData().navigationStart
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
        this.getNavigationData().loadEventEnd - this.getNavigationData().navigationStart
      );
    } catch (e) {
      return null;
    }
  }

}
