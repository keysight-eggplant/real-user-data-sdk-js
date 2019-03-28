export default class TimingCollector {

  constructor() {
    this.eventStart;
    this.eventEnd;
    this.performanceData = window.performance.timing;
  }

   eventStart() {
    this.eventStart = this.performanceData.navigationStart;
  }

   eventEnd() {
    this.eventEnd = this.performanceData.loadEventEnd || this.performanceData.domContentLoadedEventEnd;
  }

  async prepare (event) {
    event.eventStart = this.eventStart;
    event.eventEnd = this.eventEnd;

    return event;
  }

}

// https://webmasters.stackexchange.com/questions/87764/javascript-page-load-time-calculation-returns-negative
// https://stackoverflow.com/questions/7606972/measuring-site-load-times-via-performance-api
/*
$(window).load(function(){
  setTimeout(function(){
  window.performance = window.performance || window.mozPerformance || window.msPerformance || window.webkitPerformance || {};
  var timing = performance.timing || {};
  var parseTime = timing.loadEventEnd - timing.responseEnd;
  console.log('Parsetime: ', parseTime);
  }, 0);
 });


// https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API
//Calculate the total page load time
var perfData = window.performance.timing;
var pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;

//Calculate request response time
var connectTime = perfData.responseEnd - perfData.requestStart;

//Calculate page render time
var renderTime = perfData.domComplete - perfData.domLoading;

/*
https://developer.mozilla.org/en-US/docs/Web/API/Navigation_timing_API

https://developer.mozilla.org/en-US/docs/Web/API/PerformanceTiming/loadEventEnd
https://developer.mozilla.org/en-US/docs/Web/API/PerformanceNavigationTiming#Browser_compatibility
https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntries
https://developer.mozilla.org/en-US/docs/Web/API/Performance
*/