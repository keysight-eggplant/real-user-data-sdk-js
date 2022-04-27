async function rciMainAction(tenancyId, rciSdk) {
  // Step 1: Configure your Transport with the tenancyId provided
  const targetUrl = `http://localhost:3000/v1/${tenancyId}/stream`;
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

const waitUntil = (condition, repeatInterval) => new Promise((resolve) => {
  const interval = setInterval(() => {
    console.log('99');
    if (!condition()) {
      console.log('0');
      return;
    }
    console.log('100');
    clearInterval(interval);
    resolve();
  }, repeatInterval);
});

// setTimeout(() => {
// Path 1: Trigger the RCI instrumentation bootstrap process straight away
if (RCICoreReady === true) {
  console.log('bla1');
  rciMainAction(tenancyId, window.rciSdk);

  // Bind on event and wait for dispatch by the SDK
} else {
  window.addEventListener('RCICoreReady', async () => {
    await waitUntil(() => {
      console.log('1');
      return typeof window.rciSdk !== 'undefined' && Object.prototype.hasOwnProperty.call(window.rciSdk, '__esModule');
    }, 10);
    await rciMainAction(tenancyId, window.rciSdk);
  });
}
// }, 10);
