function rciMainAction(tenancyId, rciSdk) {
  // Step 1: Configure your Transport with the tenancyId provided
  const targetUrl = `http://localhost:3000/v1/${tenancyId}/stream`;
  const transport = new rciSdk.Transport(targetUrl);

  // Step 2.a: Capture your default collectors
  const defaults = rciSdk.collector.defaultCollectors;

  // Step 2.c: Create the pre-defined collectors collection
  const customPreDefined = [
    ...rciSdk.collector.webFocusedCollectors,
    new rciSdk.collector.InstrumentationVersionCollector('v1.2.3')
  ];

  // Step 2.d: Create the custom collectors collection
  const custom = [];

  // Step 3: Build a new Producer with transport and collectors
  const producer = new rciSdk.Producer(transport, defaults.concat(customPreDefined, custom));

  // Step 4: Register your hook
  rciSdk.TriggerHelper.waitAndTrigger({
    ...rciSdk.TriggerHelper.defaultWaitAndTriggerOptions,
    producer
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
