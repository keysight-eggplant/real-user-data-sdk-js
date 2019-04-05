((tenancyId, rciSdk) => {
  // Step 1: Create your Checkout collectors
  const conversionCollector = new rciSdk.collector.ConversionCollector();
  const eventAction = new rciSdk.collector.EventActionCollector(rciSdk.EVENT_ACTION.STATE_LOAD_PARTIAL);
  const spaTimingCollector = new rciSdk.collector.SpaTimingCollector();
  const uriWithCustomCategory = new rciSdk.collector.UriWithCustomCategoryCollector('Checkout Completed');

  // Step 2: Configure your Transport with the tenancyId provided
  const targetUrl = `https://event.real-user-data.eggplant.cloud/v1/${tenancyId}/stream`;
  const transport = new rciSdk.Transport(targetUrl);

  // Step 3: Capture your default collectors
  const defaults = rciSdk.collector.defaultCollectors;

  // Step 4: Capture your custom collectors
  const custom = [
    eventAction,
    conversionCollector,
    spaTimingCollector,
    uriWithCustomCategory
  ];

  // Step 5: Build a new Producer with transport and merged collector
  const producer = new rciSdk.Producer(transport, defaults.concat(custom));

  // Step 6a: Register your hook
  const checkout = document.getElementById('checkout-form');
  checkout.addEventListener('submit', async (e) => {
    try {
      e.preventDefault();

      // Step 7: Initiate your single page app timing
      spaTimingCollector.start();

      // Step 8: Identify your converting condition
      const success = document.getElementById('checkout-form-success');
      if (success.checked) {
        // Step 9a: Feed in the ecommerce data
        conversionCollector.success(
          'transaction',
          4900,
          'USD'
        );

        // Step 9b: Collect and send the converting event
        await producer.collect();

        // Step 9c: Clear the ecommerce data
        conversionCollector.clear();
      } else {
        // Step 9b: Collect and send the non-converting event
        await producer.collect();
      }

      // Step 10: Clear single page app timing
      spaTimingCollector.clear();
    } catch (cause) {
      console.log('Error processing event', cause);
    }
  });

})('123-456', rciSdk);
