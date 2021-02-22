function rciMainAction(tenancyId, rciSdk) {
  // Step 1: Configure your Transport with the tenancyId provided
  const targetUrl = `https://target.domain/v1/${tenancyId}/stream`;
  const transport = new rciSdk.Transport(targetUrl);

  // Step 2: Capture your default collectors
  const defaults = rciSdk.collector.defaultCollectors;

  // Step 3: Build a new Producer with transport and collector
  const producer = new rciSdk.Producer(transport, defaults);

  // Step 2: Catch your error
  try {
    // Perform an action, such as state transition or checkout.
    throw new TypeError('Oh no!  Something unexpected happened');
  } catch (e) {
    // Step 3: Provide your error data
    producer.error(
      e.name,
      e.message,
      true
    );
  }
}

const tenancyId = '123-456';

// Trigger the RCI instrumentation bootstrap process straight away
if (window.hasOwnProperty('RCICoreReady')) {
  rciMainAction(tenancyId, window.rciSdk);

// Bind on event and wait for dispatch by the SDK
} else {
  window.addEventListener('RCICoreReady', (e) => {
    rciMainAction(tenancyId, window.rciSdk);
  });
}
