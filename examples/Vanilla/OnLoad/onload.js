function rciMainAction(tenancyId, rciSdk) {
  // Step 1: Configure your Transport with the tenancyId provided
  const targetUrl = `https://target.domain/v1/${tenancyId}/stream`;
  const transport = new rciSdk.Transport(targetUrl);

  // Step 2: Capture your default collectors
  const defaults = rciSdk.collector.defaultCollectors;

  // Step 3: Build a new Producer with transport and collector
  const producer = new rciSdk.Producer(transport, defaults);

  // Step 4: Trigger Event
  window.addEventListener('load', async () => {
    try {
      await producer.collect();
    } catch (e) {
      await producer.error(
        rciSdk.collector.ErrorCollector.ERROR_CODES.TRIGGER_ACTION_FAILED,
        'rci-instrumentation',
        false
      );
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
