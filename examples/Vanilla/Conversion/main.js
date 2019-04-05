((tenancyId, rciSdk) => {
  // Step 1: Create your Checkout collector
  const conversionCollector = new rciSdk.collector.ConversionCollector();

  // Step 2: Configure your Transport with the tenancyId provided
  const targetUrl = `https://target.domain/v1/${tenancyId}/stream`;
  const transport = new rciSdk.Transport(targetUrl);

  // Step 3: Capture your default collectors
  const defaults = rciSdk.collector.defaultCollectors;

  // Step 4: Capture your custom collector
  const custom = [conversionCollector];

  // Step 5: Build a new Producer with transport and merged collector
  const producer = new rciSdk.Producer(transport, defaults.concat(custom));

  // Step 6: Register your hook
  const checkout = document.getElementById('checkout-form');
  checkout.addEventListener('submit', async (e) => {
    try {
      e.preventDefault();

      // Step 7: Identify your converting condition
      const success = document.getElementById('checkout-form-success');
      if (success.checked) {
        // Step 8a: Feed in the ecommerce data
        conversionCollector.success(
          'transaction',
          4900,
          'USD'
        );

        // Step 8b: Collect and send the converting event
        await producer.collect();

        // Step 8c: Clear the ecommerce data
        conversionCollector.clear();
      } else {
        // Step 9b: Collect and send the non-converting event
        await producer.collect();
      }
    } catch (cause) {
      console.log('Error processing event', cause);
    }
  });

})('123-456', rciSdk);
