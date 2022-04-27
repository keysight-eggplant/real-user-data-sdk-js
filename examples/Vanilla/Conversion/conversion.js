function rciMainAction(tenancyId, rciSdk) {
  // Step 1: Create your Checkout collectors
  const conversionCollector = new rciSdk.collector.ConversionCollector();
  const eventAction = new rciSdk.collector.EventActionCollector(
    rciSdk.EVENT_ACTION.STATE_LOAD_PARTIAL
  );
  const spaTimingCollector = new rciSdk.collector.SpaTimingCollector();
  const uriWithCustomCategory = new rciSdk.collector.UriWithCustomCategoryCollector(
    'Checkout Completed'
  );

  // Step 2: Configure your Transport with the tenancyId provided
  const targetUrl = `http://localhost:3000/v1/${tenancyId}/stream`;
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
      const goalType = document.getElementById('checkout-form-type').value;
      const goalValue = document.getElementById('checkout-form-value').value;
      const goalCurrency = document.getElementById('checkout-form-currency').value;
      if (success.checked) {
        // Step 9a: Feed in the ecommerce data
        conversionCollector.success(
          goalType,
          parseInt(goalValue, 10),
          goalCurrency
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
}

const tenancyId = '123-456';
const {RCICoreReady} = window;

// Path 1: Trigger the RCI instrumentation bootstrap process straight away
if (RCICoreReady) {
  rciMainAction(tenancyId, window.rciSdk);

// Bind on event and wait for dispatch by the SDK
} else {
  window.addEventListener('RCICoreReady', () => {
    rciMainAction(tenancyId, window.rciSdk);
  });
}
