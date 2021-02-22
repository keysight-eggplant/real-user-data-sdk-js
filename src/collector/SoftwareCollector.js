/* eslint-disable no-restricted-globals */
import UserAgentParser from './utility/UserAgentParser';

export default class SoftwareCollector extends UserAgentParser {

  async prepare (event) {
    const browser = this.parser.getBrowser();
    const {version} = browser;
    const os = this.parser.getOS();
    const encoding = (document.inputEncoding || document.characterSet) || (document.charset || document.defaultCharset);
    event.viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight, 0) || null;
    event.viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth, 0) || null;
    event.screenColors = screen.colorDepth || '';
    event.osName = os.name || '';
    event.osVersion = os.version || '';
    event.encoding = encoding || '';
    event.language = (document.documentElement.lang || navigator.language) || '';
    event.softwareInfo1 = browser.name || '';

    // Marked as deprecated in the library (for 6 years...)
    if (typeof version === 'string') {
      const parts = version.trim().split('.');
      // If there is a dot notation then bring forward the first part, otherwise fall back
      event.softwareInfo2 = parts.length > 1 ? parts[0] : version;
    } else {
      event.softwareInfo3 = version;
    }

    event.softwareInfo3 = browser.version || '';
    return event;
  }
}
