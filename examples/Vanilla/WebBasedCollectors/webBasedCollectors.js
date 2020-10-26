((tenancyId, rciSdk) => {
  // Step 1: Configure your Transport with the tenancyId provided
  const targetUrl = `https://target.domain/v1/${tenancyId}/stream`;
  const transport = new rciSdk.Transport(targetUrl);

  // Step 2.a: Capture your default collectors
  const defaults = rciSdk.collector.defaultCollectors;

  // Step 2.b: Capture WebFocusedCollectors
  const webFocusedCollectors =
      [
        new rciSdk.collector.WebBackEndCollector(),
        new rciSdk.collector.WebPageLoadTimesCollector(),
        new rciSdk.collector.WebPaintTimesCollector(),
        new rciSdk.collector.WebVitalsCollector()
      ];

  // Step 2.c: Create the final collectors collection
  const finalCollectorCollection = defaults.concat(webFocusedCollectors);

  // Step 3: Build a new Producer with transport and collector
  const producer = new rciSdk.Producer(transport, finalCollectorCollection);

  // Step 4: Register your hook
  // Caution: There may already be an onload registered - in which case use a decorator pattern.


  rciSdk.TriggerHelper.waitAndTrigger({
    interval: 1, condition: rciSdk.TriggerHelper.defaultCondition, action: rciSdk.TriggerHelper.action, timeout: 1000, producer
  });


})('123-456', rciSdk);