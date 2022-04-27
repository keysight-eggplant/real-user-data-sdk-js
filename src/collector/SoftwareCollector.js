/* eslint-disable no-restricted-globals */
import UserAgentParser from '../core/utility/UserAgentParser.js';

export default class SoftwareCollector extends UserAgentParser {

  async prepare (event) {
    const browser = this.parser.getBrowser();
    const {version} = browser;
    const os = this.parser.getOS();
    const encoding = (document.inputEncoding || document.characterSet)
      || (document.charset || document.defaultCharset);
    event.viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight, 0)
      || null;
    event.viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth, 0)
      || null;
    event.screenColors = screen.colorDepth || null;
    event.osName = os.name || null;
    event.osVersion = os.version || null;
    event.encoding = encoding || null;
    event.language = (document.documentElement.lang || navigator.language) || null;
    event.softwareInfo1 = browser.name || null;

    // Marked as deprecated in the library (for 6 years...)
    if (typeof version === 'string' && version.length) {
      const parts = version.trim().split('.');
      // If there is a dot notation then bring forward the first part, otherwise fall back
      event.softwareInfo2 = parts.length > 1 ? parts[0] : version;
    } else {
      event.softwareInfo2 = version || null;
    }

    event.softwareInfo3 = version || null;
    return event;
  }
}
