function rciMainAction(tenancyId, rciSdk) {
  // Step 1: Define your Factory
  const rciSdkProducerFactory = (customCollectors) => {
    const targetUrl = `http://localhost:3000/v1/${tenancyId}/stream`;
    const transport = new rciSdk.Transport(targetUrl);
    const defaults = rciSdk.collector.defaultCollectors;
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
