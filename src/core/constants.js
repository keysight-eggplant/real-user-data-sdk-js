export const EVENT_TYPE = {
  STATE: 'state',
  ERROR: 'error'
};

export const EVENT_ACTION = {
  STATE_TRANSITION_FULL: 'state-load-full',
  STATE_LOAD_PARTIAL: 'state-load-partial'
};

export const JOURNEY_ACTION = {
  START: 'start',
  STOP: 'stop'
};

export const TARGETED_DATA_URL_BASED = {
  FULL_URL: 'fullURL',
  URL_HOST: 'URLHost',
  URL_PATHNAME: 'URLPathName',
  URL_SEARCH: 'URLSearch'
};

export const TARGETED_DATA_HTML_BASED = {
  CANONICAL_LINKS: 'CanonicalLinks'
};

/**
 * https://datatracker.ietf.org/doc/html/rfc3986
 * https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
 * https://danielmiessler.com/study/difference-between-uri-url/
 */
export const TARGETED_DATA = {
  ...TARGETED_DATA_URL_BASED,
  ...TARGETED_DATA_HTML_BASED
};

export const TARGET_SEARCH_MODES = {
  PERFECT_MATCH: 'perfectMatch',
  PARTIAL_MATCH: 'partialMatch',
  REGEX: 'regex'
};
