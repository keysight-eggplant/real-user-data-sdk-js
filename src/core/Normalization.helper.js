/* eslint-disable no-plusplus */
/* eslint no-await-in-loop: 0 */
export default class NormalizationHelper {
  /**
     *
     * @param {String|Number} value  - The value that will be normalized
     * @param {Boolean} fullUnit - This is by default on true. If you put this on false, the method will not do the multiplication
     * @returns {Number}
     */
  static normalizeGoalValue (value, fullUnit) {

    if (fullUnit !== false) {
      fullUnit = true;
    }

    let normalized = parseFloat(value);
    if (Number.isNaN(normalized)) {
      return null;
    } if (normalized % 1 === 0) {
      if (fullUnit) {
        return normalized * 100;
      }
      return normalized;

    }
    if (fullUnit) {
      normalized = Number(normalized.toFixed(2));
      return normalized * 100;
    }
    normalized = Number(normalized.toFixed(0));
    return normalized;
  }

  /**
   * @param {Number|null} value
   * @returns {Number|null}
   */
  static normalizeNonZeroPositiveInteger (value) {
    if (typeof value === 'string' || value instanceof String) {
      /** If is string */
      if (/^((\d*\.\d+)|(\d+))$/g.test(value)) {
        if (value !== '0') {
          return Math.round(value);
        }
        return null;
      }
      return null;
    } if (typeof value === 'number' && value === Number(value) && value !== Infinity && value !== -Infinity && value > 0 && value !== 0) {
      return Math.round(value);
    }
    return null;

  }
}
