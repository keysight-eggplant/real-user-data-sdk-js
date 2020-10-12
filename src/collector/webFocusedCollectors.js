import WebBackEndCollector from './WebBackEndCollector';
import WebPageLoadTimesCollector from './WebPageLoadTimesCollector';
import WebPaintTimesCollector from './WebPaintTimesCollector';
import WebVitalsCollector from './WebVitalsCollector';

/** Collection for web focused collectors. Those are not necessary in non-web applications */
export default [
  new WebBackEndCollector(),
  new WebPageLoadTimesCollector(),
  new WebPaintTimesCollector(),
  new WebVitalsCollector()
];
