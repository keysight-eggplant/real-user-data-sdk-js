import UserAgentParser from '../utility/UserAgentParser.js';
import NavigationV2WithPaintPerformanceService from './NavigationV2WithPaintPerformanceService.js';
import PerformanceService from './PerformanceService.js';
import NavigationV1PerformanceService from './NavigationV1PerformanceService.js';
import NavigationV2PerformanceService from './NavigationV2PerformanceService.js';

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
      case 'opera':
      case 'opera mini':
      case 'opera touch':
      case 'samsung browser':
      case 'webkit':
        // https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming#browser_compatibility
        // https://developer.mozilla.org/en-US/docs/Web/API/PerformancePaintTiming
        return new NavigationV2WithPaintPerformanceService();

      case 'firefox':
      case 'firefox focus':
      case 'mozilla':
        // https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming#browser_compatibility
        return new NavigationV2PerformanceService();

      case 'safari':
      case 'mobile safari':
        return new NavigationV1PerformanceService();

      default:
        return new PerformanceService();
    }
  }
}
