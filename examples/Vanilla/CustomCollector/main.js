((tenancyId, rciSdk) => {
  // Step 1: Define your Factory
  const rciSdkProducerFactory = (customCollectors) => {
    const targetUrl = `https://event.dev.real-user-data.webperfdev.com/v1/${tenancyId}/stream`;
    const transport = new rciSdk.Transport(targetUrl);
    const defaults = rciSdk.collector.defaultCollectors;
    const collection = defaults.concat(customCollectors);
    return new rciSdk.Producer(transport, collection);
  };

  // Step 2: Register your hook
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      console.log('add listener');

      // Step 3: Define your custom collector
      const customCollector = {
        prepare: async (event) => {
          event.eventInfo1 = 'FOO';
          event.eventInfo2 = 'BAR';
          return event;
        }
      };

      // Step 4: Call your factory
      console.log('collecting');
      await rciSdkProducerFactory([customCollector]).collect();
    } catch (cause) {
      console.log('Error processing event', cause);
    }
  });

})('39ea5e34-f96e-47e6-9a28-f0bf430c3fa7', rciSdk);
