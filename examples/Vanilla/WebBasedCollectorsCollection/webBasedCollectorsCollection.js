((tenancyId, rciSdk) => {
  // Step 1: Configure your Transport with the tenancyId provided
  const targetUrl = `https://target.domain/v1/${tenancyId}/stream`;
  const transport = new rciSdk.Transport(targetUrl);

  // Step 2.a: Capture your default collectors
  const defaults = rciSdk.collector.defaultCollectors;

  // Step 2.b: Capture WebFocusedCollectors
  const {webFocusedCollectors} = rciSdk.collector;

  // Step 2.c: Create the final collectors collection
  const finalCollectorCollection = defaults.concat(webFocusedCollectors);

  // Step 3: Build a new Producer with transport and collector
  const producer = new rciSdk.Producer(transport, finalCollectorCollection);

  // Step 4: Register your hook
  // Caution: There may already be an onload registered - in which case use a decorator pattern.

  /** Check for domComplete values to be populated by the browser */
  async function condition () {
    try {
      const perf = !!(window.performance && window.performance.timing && ((window.performance.timing.domComplete - window.performance.timing.navigationStart) > 0));

      let paintReady = false;
      const po = new PerformanceObserver((entryList, po) => {
        paintReady =  entryList.getEntries().length > 0;
        console.log(window.performance.getEntriesByType('paint')[0].startTime);
      });

      // Observe entries of type `largest-contentful-paint`, including buffered entries,
      // i.e. entries that occurred before calling `observe()` below.
      po.observe({
        entryTypes: ['paint']
      });

      return perf && paintReady;
    } catch (e) {
      console.log(e);
      return true;
    }
  }


  rciSdk.TriggerHelper.waitAndTrigger({
    interval: 1, condition, action: rciSdk.TriggerHelper.action, timeout: 1000, producer
  });


})('123-456', rciSdk);
