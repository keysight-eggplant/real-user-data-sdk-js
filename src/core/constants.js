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

/**
 * https://datatracker.ietf.org/doc/html/rfc3986
 * https://en.wikipedia.org/wiki/Uniform_Resource_Identifier
 * https://danielmiessler.com/study/difference-between-uri-url/
 */
export const TARGETED_DATA = {
  FULL_URL: 'fullURL',
  URI: 'URI',
  URL_SCHEME: 'URLScheme',
  URL_HOSTNAME: 'URLHostname',
  URL_PORT: 'URLPort',
  URL_AUTORITY: 'URLAuthority',
  URL_PATH: 'URLPath',
  URL_QUERY: 'URLQuery',
  URL_FRAGMENT: 'URLFragment',
  CANONICAL_LINKS: 'CanonicalLinks'
};

export const TARGET_SEARCH_MODES = {
  PERFECT_MATCH: 'perfectMatch',
  PARTIAL_MATCH: 'partialMatch',
  REGEX: 'regex'
};
