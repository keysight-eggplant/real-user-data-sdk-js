import WebBackEndCollector from './WebBackEndCollector.js';
import WebPageLoadTimesCollector from './WebPageLoadTimesCollector.js';
import WebPaintTimesCollector from './WebPaintTimesCollector.js';
import WebVitalsCollector from './WebVitalsCollector.js';
import PerformanceServiceFactory from '../core/performance/PerformanceServiceFactory.js';

const performanceServiceFactory = new PerformanceServiceFactory();

/** Collection for web focused collectors. Those are not necessary in non-web applications */
export default [
  new WebBackEndCollector(performanceServiceFactory),
  new WebPageLoadTimesCollector(performanceServiceFactory),
  new WebPaintTimesCollector(performanceServiceFactory),
  new WebVitalsCollector()
];
