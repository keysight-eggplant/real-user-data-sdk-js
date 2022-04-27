import NormalizationHelper from './Normalization.helper.js';

describe('NormalizationHelper Unit Tests', () => {
  describe('normalizeGoalValue', () => {
    it('should normalize an empty string', async () => {

      const initial = '';

      const actual = NormalizationHelper.normalizeGoalValue(initial);
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it('should normalize when is an integer', async () => {

      const initial = 948;

      const actual = NormalizationHelper.normalizeGoalValue(initial);
      const expected = 94800;

      expect(actual).toEqual(expected);
    });
    it('should normalize when is a float', async () => {

      const initial = 948.342;

      const actual = NormalizationHelper.normalizeGoalValue(initial);
      const expected = 94834;

      expect(actual).toEqual(expected);
    });

    it('should normalize when is a float (one decimal)', async () => {

      const initial = 948.3;

      const actual = NormalizationHelper.normalizeGoalValue(initial);
      const expected = 94830;

      expect(actual).toEqual(expected);
    });

    it('should normalize when is an integer (as string)', async () => {

      const initial = '948';

      const actual = NormalizationHelper.normalizeGoalValue(initial);
      const expected = 94800;

      expect(actual).toEqual(expected);
    });
    it('should normalize when is a float (as string)', async () => {

      const initial = '948.342';

      const actual = NormalizationHelper.normalizeGoalValue(initial);
      const expected = 94834;

      expect(actual).toEqual(expected);
    });

    it('should normalize when is a float (one decimal) (as string)', async () => {

      const initial = '948.3';

      const actual = NormalizationHelper.normalizeGoalValue(initial);
      const expected = 94830;

      expect(actual).toEqual(expected);
    });

    it('should normalize an empty string with fullUnit on false', async () => {

      const initial = '';

      const actual = NormalizationHelper.normalizeGoalValue(initial, false);
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it('should normalize when is an integer with fullUnit on false (as string)', async () => {

      const initial = '948';

      const actual = NormalizationHelper.normalizeGoalValue(initial, false);
      const expected = 948;

      expect(actual).toEqual(expected);
    });
    it('should normalize when is a float with fullUnit on false (as string)', async () => {

      const initial = '948.342';

      const actual = NormalizationHelper.normalizeGoalValue(initial, false);
      const expected = 948;

      expect(actual).toEqual(expected);
    });
    it('should normalize when is a float (one decimal) with fullUnit on false (as string)', async () => {

      const initial = '948.3';

      const actual = NormalizationHelper.normalizeGoalValue(initial, false);
      const expected = 948;

      expect(actual).toEqual(expected);
    });
    it('should normalize when is an integer with fullUnit on false', async () => {

      const initial = 948;

      const actual = NormalizationHelper.normalizeGoalValue(initial, false);
      const expected = 948;

      expect(actual).toEqual(expected);
    });
    it('should normalize when is a float with fullUnit on false', async () => {

      const initial = 948.342;

      const actual = NormalizationHelper.normalizeGoalValue(initial, false);
      const expected = 948;

      expect(actual).toEqual(expected);
    });
    it('should normalize when is a float (one decimal) with fullUnit on false', async () => {

      const initial = 948.3;

      const actual = NormalizationHelper.normalizeGoalValue(initial, false);
      const expected = 948;

      expect(actual).toEqual(expected);
    });
  });
  describe('normalizeNonZeroPositiveInteger', () => {
    it('should normalize when the value is null', async () => {

      const initial = null;

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it('should normalize when the value is float', async () => {

      const initial = 11.33;

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = 11;

      expect(actual).toEqual(expected);
    });
    it('should normalize when the value is float over half', async () => {

      const initial = 11.63;

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = 12;

      expect(actual).toEqual(expected);
    });
    it('should normalize when the value is string number', async () => {

      const initial = '11';

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = 11;

      expect(actual).toEqual(expected);
    });
    it('should normalize when the value is string float below half', async () => {

      const initial = '11.35';

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = 11;

      expect(actual).toEqual(expected);
    });
    it('should normalize when the value is string float over half', async () => {

      const initial = '11.65';

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = 12;

      expect(actual).toEqual(expected);
    });
    it('should normalize when the value is 0', async () => {

      const initial = 0;

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it('should normalize when the value is string 0', async () => {

      const initial = '0';

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it('should normalize when the value is string 0.0', async () => {

      const initial = '0.0';

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it('should normalize when the value is string 00.0000', async () => {

      const initial = '00.0000';

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it('should normalize when the value is a negative number', async () => {

      const initial = -6;

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it('should normalize when the value is a negative float', async () => {

      const initial = -6.54;

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it('should normalize when the value is a string', async () => {

      const initial = 'lorem';

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it('should normalize when the value is a boolean', async () => {

      const initial = true;

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = null;

      expect(actual).toEqual(expected);
    });
    it('should normalize when the value is an object', async () => {

      const initial = {a: 'b'};

      const actual = NormalizationHelper.normalizeNonZeroPositiveInteger(initial);
      const expected = null;

      expect(actual).toEqual(expected);
    });
  });
});
