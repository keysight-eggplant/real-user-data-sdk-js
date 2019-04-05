((tenancyId, rciSdk) => {
  // Step 1: Define your Factory
  const rciSdkProducerFactory = (customCollectors) => {
    const transport = new rciSdk.Transport(tenancyId);
    const defaults = rciSdk.collections.defaultCollection;
    const collection = defaults.concat(customCollectors);
    return new rciSdk.Producer(transport, collection);
  };

  // Step 2: Register your hook
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      // Step 3: Define your custom collector
      const customCollector = {
        prepare: async (event) => {
          event.eventInfo1 = 'FOO';
          event.eventInfo2 = 'BAR';
          return event;
        }
      };

      // Step 4: Call your factory
      await rciSdkProducerFactory([customCollector]).collect();
    } catch (cause) {
      console.log('Error processing event', cause);
    }
  });

})('123-456', rciSdk);
