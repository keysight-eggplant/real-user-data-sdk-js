import UserAgentParser from '../utility/UserAgentParser'
import PerformanceNavigationPaintTimingService from './PerformanceNavigationPaintTimingService';
import PerformanceService from './PerformanceService';
import PerformanceTimingService from './PerformanceTimingService';

export default class PerformanceServiceFactory {
  constructor() {
    this.parser = new UserAgentParser().parser;
  }

  /**
   * @returns PerformanceService
   */
  create () {
    const browser = this.parser.getBrowser();
    switch (browser.name.toLowerCase()) {
      case 'chrome':
      case 'chrome headless':
      case 'chrome webview':
      case 'chromium':
      case 'edge':
      case 'firefox':
      case 'firefox focus':
      case 'mozilla':
      case 'opera':
      case 'opera mini':
      case 'opera touch':
      case 'samsung browser':
      case 'webkit':
        // https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming#browser_compatibility
        return new PerformanceNavigationPaintTimingService();

      case 'safari':
      case 'safari mobile':
        return new PerformanceTimingService();

      default:
        return new PerformanceService();
    }
  }
}
