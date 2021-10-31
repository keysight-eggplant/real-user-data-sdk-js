function rciMainAction(tenancyId, rciSdk) {
  // Step 1: Configure your Transport with the tenancyId provided
  const targetUrl = `https://target.domain/v1/${tenancyId}/stream`;
  const transport = new rciSdk.Transport(targetUrl);

  // Step 2: Capture your default collectors
  let defaults = rciSdk.collector.defaultCollectors;

  /**
   * @type {Config}
   */
  const config = {
    actions: true,
    actionsBatching: false,
    events: [
      {
        selector: 'window', eventName: 'load', eventCategory: 'Document', scope: 'state'
      },
      {
        selector: '*', eventName: 'mousedown', eventCategory: 'Mouse', scope: 'action'
      }
    ]

  };

  // Step 2.1 Prepare the collectors collection
  defaults = rciSdk.ConfigurationService.prepareCollectors(defaults, config);

  // Step 3: Build a new Producer with transport and collector
  const producer = new rciSdk.Producer(transport, defaults);

  // Step 3.2: Register the triggers
  rciSdk.TriggerHelper.registerTriggers(producer, config);

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
