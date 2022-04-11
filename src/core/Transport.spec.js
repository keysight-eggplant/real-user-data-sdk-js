import sinon from 'sinon';
import Transport from './Transport.js';
import {TARGETED_DATA, TARGET_SEARCH_MODES} from './constants.js';

describe('Transport Unit Tests', () => {

  const tenancyId = '123-456';

  const validTarget = {
    targetedData: TARGETED_DATA.FULL_URL,
    searchMode: TARGET_SEARCH_MODES.PARTIAL_MATCH,
    searchValue: 'example.com:8232'
  };

  const validTargetWithRegex = {
    targetedData: TARGETED_DATA.URL_PATHNAME,
    searchMode: TARGET_SEARCH_MODES.REGEX,
    searchValue: '.+(\/test\/).+'
  };

  const invalidTarget = {
    targetedData: TARGETED_DATA.FULL_URL,
    searchMode: 'gibberish',
    searchValue: 'localhost:3000'
  };

  const incompleteTarget = {
    targetedData: TARGETED_DATA.FULL_URL,
    searchValue: 'localhost:3000'
  };

  const tenancies = [
    {
      name: 'E2E Test', //  Valid target
      targetUrl: 'https://target.domain/v1/111-222/stream',
      tenancyId: '111-222',
      target: validTarget
    },
    {
      name: 'Beacon Generator 1', // Invalid target
      targetUrl: 'https://target.domain/v1/333-444/stream',
      tenancyId: '333-444',
      target: invalidTarget
    },
    {
      name: 'Beacon Generator 2', // Valid target, url passed
      targetUrl: 'https://target.domain/v1/555-666/stream',
      tenancyId: '555-666',
      target: validTargetWithRegex
    },
    {
      name: 'E2E Cohort Test', // Target incomplete
      targetUrl: 'https://target.domain/v1/777-888/stream',
      tenancyId: '777-888',
      target: incompleteTarget
    },
    {
      name: 'Beacon Generator 3', // Missing target
      targetUrl: 'https://target.domain/v1/999-000/stream',
      tenancyId: '999-000'
    }
  ];

  let server;
  let location;
  let mockLocation;

  beforeEach(() => {
    server = sinon.createFakeServer();
    location = window.location;
    mockLocation = new URL('https://example.com:8232/en-US/test/search?q=URLPath&&lorem=ipsum');
    mockLocation.replace = jest.fn();
    delete window.location;
    window.location = mockLocation;
  });

  afterEach(() => {
    server.restore();
    window.location = location;
  });

  it('should send given event as JSON body (given a string)', () => {
    const targetUrl = `https://target.domain/v1/${tenancyId}/stream`;
    const transport = new Transport(targetUrl);
    const event = {
      id: 'abc-abc-123',
      clientId: 'def-def-123',
      eventType: 'event',
      eventAction: 'click',
      eventStart: 1000000,
      eventEnd: 1000001,
      eventSource: 'http://test.test/test',
      eventCategory: 'product',
      deviceType: 'test device'
    };

    const dataJson = JSON.stringify(event);

    server.respondWith(
      'POST',
      `https://target.domain/v1/${tenancyId}/stream`,
      [200, { 'Content-Type': 'application/json' }, '']
    );

    transport.execute(event);

    server.respond();

    expect(server.requests[0].url).toEqual(`https://target.domain/v1/${tenancyId}/stream`);

    expect(server.requests[0].requestBody).toEqual(dataJson);

  });

  it('should send given events as JSON body to multiple urls (tenancies with given URLs)', () => {

    // const targetUrl = `https://target.domain/v1/${tenancyId}/stream`;
    const transport = new Transport(tenancies);
    const event = {
      id: 'abc-abc-123',
      clientId: 'def-def-123',
      eventType: 'event',
      eventAction: 'click',
      eventStart: 1000000,
      eventEnd: 1000001,
      eventSource: 'http://test.test/test',
      eventCategory: 'product',
      deviceType: 'test device'
    };

    const dataJson = JSON.stringify(event);

    server.respondWith(
      'POST',
      `https://target.domain/v1/${tenancyId}/stream`,
      [200, { 'Content-Type': 'application/json' }, '']
    );

    transport.execute(event);

    server.respond();

    expect(server.requests[0].url).toEqual(tenancies[0].targetUrl);
    expect(server.requests[1].url).toEqual(tenancies[2].targetUrl);

    expect(server.requests[0].requestBody).toEqual(dataJson);
    expect(server.requests[1].requestBody).toEqual(dataJson);

  });

  describe('isTargetMatching', () => {

    it('should return true for an object targeting and matching some parts of the full URL via perfect match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.FULL_URL,
        searchMode: TARGET_SEARCH_MODES.PERFECT_MATCH,
        searchValue: 'https://example.com:8232/en-US/test/search?q=URLPath&&lorem=ipsum'
      };
      const expected = true;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return false for an object targeting and not matching some parts of the full URL via perfect match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.FULL_URL,
        searchMode: TARGET_SEARCH_MODES.PERFECT_MATCH,
        searchValue: 'https://example.com:8232/en-US/luna/search?q=URLPath&&lorem=ipsum'
      };
      const expected = false;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return true for an object targeting and matching some parts of the URL Host via perfect match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_HOST,
        searchMode: TARGET_SEARCH_MODES.PERFECT_MATCH,
        searchValue: 'example.com:8232'
      };
      const expected = true;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return false for an object targeting and not matching some parts of the URL Host via perfect match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_HOST,
        searchMode: TARGET_SEARCH_MODES.PERFECT_MATCH,
        searchValue: 'luna.com:8232'
      };
      const expected = false;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return true for an object targeting and matching some parts of the URL path name via perfect match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_PATHNAME,
        searchMode: TARGET_SEARCH_MODES.PERFECT_MATCH,
        searchValue: '/en-US/test/search'
      };
      const expected = true;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return false for an object targeting and not matching some parts of the URL path name via perfect match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_PATHNAME,
        searchMode: TARGET_SEARCH_MODES.PERFECT_MATCH,
        searchValue: '/en-US/luna/search'
      };
      const expected = false;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return true for an object targeting and matching some parts of the URL Query Strings via perfect match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_SEARCH,
        searchMode: TARGET_SEARCH_MODES.PERFECT_MATCH,
        searchValue: '?q=URLPath&&lorem=ipsum'
      };
      const expected = true;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return false for an object targeting and not matching some parts of the URL Query Strings via perfect match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_SEARCH,
        searchMode: TARGET_SEARCH_MODES.PERFECT_MATCH,
        searchValue: '?q=URLPath&&lorem=dolor'
      };
      const expected = false;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return true for an object targeting and matching some parts of the full URL via partial match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.FULL_URL,
        searchMode: TARGET_SEARCH_MODES.PARTIAL_MATCH,
        searchValue: '32/en-US/test/search?q=URLPa'
      };
      const expected = true;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return false for an object targeting and not matching some parts of the full URL via partial match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.FULL_URL,
        searchMode: TARGET_SEARCH_MODES.PARTIAL_MATCH,
        searchValue: '32/en-US/luna/search?q=URLPa'
      };
      const expected = false;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return true for an object targeting and matching some parts of the URL Host via partial match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_HOST,
        searchMode: TARGET_SEARCH_MODES.PARTIAL_MATCH,
        searchValue: 'ple.com:8232'
      };
      const expected = true;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return false for an object targeting and not matching some parts of the URL Host via partial match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_HOST,
        searchMode: TARGET_SEARCH_MODES.PARTIAL_MATCH,
        searchValue: 'ple.com:3000'
      };
      const expected = false;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return true for an object targeting and matching some parts of the URL path name via partial match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_PATHNAME,
        searchMode: TARGET_SEARCH_MODES.PARTIAL_MATCH,
        searchValue: 'US/test/sea'
      };
      const expected = true;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return false for an object targeting and not matching some parts of the URL path name via partial match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_PATHNAME,
        searchMode: TARGET_SEARCH_MODES.PARTIAL_MATCH,
        searchValue: 'US/luna/sea'
      };
      const expected = false;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return true for an object targeting and matching some parts of the URL Query Strings via partial match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_SEARCH,
        searchMode: TARGET_SEARCH_MODES.PARTIAL_MATCH,
        searchValue: 'RLPath&&lor'
      };
      const expected = true;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return false for an object targeting and not matching some parts of the URL Query Strings via partial match', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_SEARCH,
        searchMode: TARGET_SEARCH_MODES.PARTIAL_MATCH,
        searchValue: 'RLWhatever&&lor'
      };
      const expected = false;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return true for an object targeting and matching some parts of the full URL via regex', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.FULL_URL,
        searchMode: TARGET_SEARCH_MODES.REGEX,
        searchValue: '(ple.com).+(\/test\/).+(&&lorem=ipsum)'
      };
      const expected = true;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return false for an object targeting and not matching some parts of the full URL via regex', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.FULL_URL,
        searchMode: TARGET_SEARCH_MODES.REGEX,
        searchValue: '(ple.com).+(\/bonkers\/).+(&&lorem=ipsum)'
      };
      const expected = false;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return true for an object targeting and matching some parts of the URL Host via regex', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_HOST,
        searchMode: TARGET_SEARCH_MODES.REGEX,
        searchValue: '(ple.com)'
      };
      const expected = true;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return false for an object targeting and not matching some parts of the URL Host via regex', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_HOST,
        searchMode: TARGET_SEARCH_MODES.REGEX,
        searchValue: '(lorem.co.uk)'
      };
      const expected = false;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return true for an object targeting and matching some parts of the URL path name via regex', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_PATHNAME,
        searchMode: TARGET_SEARCH_MODES.REGEX,
        searchValue: '.+(\/test\/).+'
      };
      const expected = true;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return false for an object targeting and not matching some parts of the URL path name via regex', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_PATHNAME,
        searchMode: TARGET_SEARCH_MODES.REGEX,
        searchValue: '.+(\/bonkers\/).+'
      };
      const expected = false;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return true for an object targeting and matching some parts of the URL Query Strings via regex', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_SEARCH,
        searchMode: TARGET_SEARCH_MODES.REGEX,
        searchValue: '.+(&&lorem=ipsum)'
      };
      const expected = true;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

    it('should return false for an object targeting and not matching some parts of the URL Query Strings via regex', () => {
      const isTargetValid = sinon.stub(Transport, 'isTargetValid');
      isTargetValid.returns(true);

      const initial = {
        targetedData: TARGETED_DATA.URL_SEARCH,
        searchMode: TARGET_SEARCH_MODES.REGEX,
        searchValue: '.+(&&dolor=ipsum)'
      };
      const expected = false;
      const actual = Transport.isTargetMatching(initial);

      expect(actual).toEqual(expected);

      isTargetValid.restore();
    });

  });

  describe('isTargetValid', () => {

    it('return true for a valid target', () => {
      const initial = validTarget;
      const expected = true;
      const actual = Transport.isTargetValid(initial);

      expect(actual).toEqual(expected);
    });

    it('return true for a valid target with regex', () => {
      const initial = validTargetWithRegex;
      const expected = true;
      const actual = Transport.isTargetValid(initial);

      expect(actual).toEqual(expected);
    });

    it('return false for an invalid target', () => {
      const initial = invalidTarget;
      const expected = false;
      const actual = Transport.isTargetValid(initial);

      expect(actual).toEqual(expected);
    });

    it('return true for a incomplete target', () => {
      const initial = incompleteTarget;
      const expected = false;
      const actual = Transport.isTargetValid(initial);

      expect(actual).toEqual(expected);
    });
    it('return false for null', () => {
      const initial = null;
      const expected = false;
      const actual = Transport.isTargetValid(initial);

      expect(actual).toEqual(expected);
    });

    it('return false for a boolean', () => {
      const initial = false;
      const expected = false;
      const actual = Transport.isTargetValid(initial);

      expect(actual).toEqual(expected);
    });

    it('return false for a NaN', () => {
      const initial = NaN;
      const expected = false;
      const actual = Transport.isTargetValid(initial);

      expect(actual).toEqual(expected);
    });

    it('return false for an empty string', () => {
      const initial = '';
      const expected = false;
      const actual = Transport.isTargetValid(initial);

      expect(actual).toEqual(expected);
    });

    it('return false for an empty object', () => {
      const initial = {};
      const expected = false;
      const actual = Transport.isTargetValid(initial);

      expect(actual).toEqual(expected);
    });

    it('return false for an empty array', () => {
      const initial = [];
      const expected = false;
      const actual = Transport.isTargetValid(initial);

      expect(actual).toEqual(expected);
    });
  });

});
