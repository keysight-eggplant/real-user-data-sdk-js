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
        if (isNaN(normalized)) {
            return 0;
        } else if (normalized % 1 === 0) {
            if (fullUnit) {
                return normalized * 100;
            } else {
                return normalized;
            }
        } else {
            if (fullUnit) {
                normalized = normalized.toFixed(2);
                return normalized * 100;
            } else {
                normalized = Number(normalized.toFixed(0));
                return normalized;
            }
        }
    }
}
