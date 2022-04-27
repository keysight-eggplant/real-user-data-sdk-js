import NormalizationHelper from '../Normalization.helper.js';
import NavigationV1PerformanceService from './NavigationV1PerformanceService.js';

export default class NavigationV2PerformanceService extends NavigationV1PerformanceService {

  /**
   * Return performance navigation data
   * @returns {object}
   */
  getNavigationData() {
    return window.performance.getEntriesByType('navigation')[0];
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
}
