import {
  TARGETED_DATA, TARGET_SEARCH_MODES, TARGETED_DATA_URL_BASED, TARGETED_DATA_HTML_BASED
} from './constants.js';

export default class Transport {

  static TARGETED_DATA_RANGE = Object.values(TARGETED_DATA);

  static TARGETED_DATA_URL_BASED_RANGE = Object.values(TARGETED_DATA_URL_BASED);

  static TARGETED_DATA_HTML_BASED_RANGE = Object.values(TARGETED_DATA_HTML_BASED);

  static TARGETED_SEARCH_MODES_RANGE = Object.values(TARGET_SEARCH_MODES);

  /**
   * @param {String|RCITenancy<Array>} input
   */
  constructor(input) {
    this.targetUrls = [];
    this.requests = [];
    if (typeof input === 'string' || input instanceof String) {
      this.targetUrls.push(input);
    } else if (Array.isArray(input) && input.length > 0) {
      this.targetUrls = this.getTargetURLs(input);
    }
  }

  static isTargetMatching(target) {
    if (!Transport.isTargetValid(target)) {
      return false;
    }

    // This is an array for cases when multiple targeted data are being found. Ex: canonicalLinks
    const input = [];

    // Handle targetedData
    if (Transport.TARGETED_DATA_URL_BASED_RANGE.includes(target.targetedData)) {
      // Decompose the URL
      const url = new URL(window.location.href);

      if (target.targetedData === TARGETED_DATA.FULL_URL) {
        // The full URL. Example: "https://example.com:8232/en-US/test/search?q=URLPath&&lorem=ipsum"
        input.push(url.href);
      } else if (target.targetedData === TARGETED_DATA.URL_HOST) {
        // Host name + Port. Example: "example.com:8232"
        input.push(url.host);
      } else if (target.targetedData === TARGETED_DATA.URL_PATHNAME) {
        // The path of the link. Example: "/en-US/test/search"
        input.push(url.pathname);
      } else if (target.targetedData === TARGETED_DATA.URL_SEARCH) {
        // Query params. Example: "?q=URLPath&&lorem=ipsum"
        input.push(url.search);
      }
    } else if (Transport.TARGETED_DATA_HTML_BASED_RANGE.includes(target.targetedData)) {
      if (target.targetedData === TARGETED_DATA.CANONICAL_LINKS) {
        const canonicalLinks = document.querySelectorAll("link[rel='canonical']");
        Array.prototype.map.call(canonicalLinks, (link) => input.push(link.href));
      }
    }

    if (input.length === 0) {
      // If the targetedData couldn't be found. return false since is
      // essentially an invalid target from a domain knowledge standpoint
      return false;
    }

    // Handle searchMode and searching
    if (target.searchMode === TARGET_SEARCH_MODES.PERFECT_MATCH) {
      for (let i = 0; i < input.length; i++) {
        if (input[i] === target.searchValue) { return true; }
      }
    } else if (target.searchMode === TARGET_SEARCH_MODES.PARTIAL_MATCH) {
      for (let i = 0; i < input.length; i++) {
        if (input[i].includes(target.searchValue)) { return true; }
      }
    } else if (target.searchMode === TARGET_SEARCH_MODES.REGEX) {
      const regex = new RegExp(target.searchValue);
      for (let i = 0; i < input.length; i++) {
        if (
          Array.isArray(input[i].match(regex))
           && input[i].match(regex).length > 0
        ) { return true; }
      }
    }

    return false;
  }

  /**
   *
   * @param {RCITarget} target
   * @returns {Boolean}
   */
  static isTargetValid (target) {

    if (!(target && Object.keys(target).length > 0
    && Object.getPrototypeOf(target) === Object.prototype)) {
      // If is an invalid object, return false
      return false;
    }

    if (!Transport.TARGETED_DATA_RANGE.includes(target.targetedData)) {
      // If is not one of the approved constants for targeted data
      return false;
    }

    if (!Transport.TARGETED_SEARCH_MODES_RANGE.includes(target.searchMode)) {
      // If is not one of the approved constants for search modes
      return false;
    }

    if (
      target.searchValue === undefined || target.searchValue === null // If searchValue is missing
      || (target.searchValue === '') // If is not a populated string
      || Number.isNaN(target.searchValue)
    ) {
      // If is not a populated string and is also not a number
      return false;
    }

    return true;
  }

  getTargetURLs (tenancies) {
    const targetURLs = [];

    for (let i = 0; i < tenancies.length; i++) {
      if (tenancies[i].target && Transport.isTargetMatching(tenancies[i].target)) {
        // If the tenancy has a target and it matches the current page
        targetURLs.push(tenancies[i].targetUrl);
      }
    }

    return targetURLs;
  }

  async sendRequest (request) {
    await new Promise((resolve) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', request.targetUrl, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = () => {
        resolve(xhr.response);
      };
      xhr.onerror = () => {
        console.log('Unable to send event!');
      };
      xhr.send(JSON.stringify(request.payload));
    });
  }

  async execute(event) {
    if (this.targetUrls.length === 0) {
      console.log('No target URLs provided');
    } else {
      const results = [];
      let request;
      for (let i = 0; i < this.targetUrls.length; i++) {
        request = {
          targetUrl: this.targetUrls[i],
          payload: event
        };

        results.push(this.sendRequest(request));
      }

      await Promise.all(results);
    }
  }
}
