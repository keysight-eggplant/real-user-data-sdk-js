import WebBackEndCollector from './WebBackEndCollector';
import WebPageLoadTimesCollector from './WebPageLoadTimesCollector';
import WebPaintTimesCollector from './WebPaintTimesCollector';
import WebVitalsCollector from './WebVitalsCollector';
import PerformanceServiceFactory from '../core/performance/PerformanceServiceFactory';

const performanceServiceFactory = new PerformanceServiceFactory();

/** Collection for web focused collectors. Those are not necessary in non-web applications */
export default [
  new WebBackEndCollector(performanceServiceFactory),
  new WebPageLoadTimesCollector(performanceServiceFactory),
  new WebPaintTimesCollector(performanceServiceFactory),
  new WebVitalsCollector()
];
