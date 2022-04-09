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

class CustomCollector {
  constructor(passed) {
    this.passed = passed;
  }

  async prepare(event) {

    event.eventInfo1 = 'FOO';
    event.eventInfo2 = 'BAR';
    event.eventInfo3 = this.passed;

    return event;
  }
}

function rciMainAction (tenancyId, rciSdk) {
  // eslint-disable-next-line no-undef
  const targetUrl = `http://localhost:3000/v1/${tenancyId}/stream`;
  const transport = new rciSdk.Transport(targetUrl);
  // this initiates the base collectors, pre-defined in the standard SDK
  const defaults = rciSdk.collector.defaultCollectors;

  const customPreDefined = [
    ...rciSdk.collector.webFocusedCollectors,
    // eslint-disable-next-line no-undef
    new rciSdk.collector.InstrumentationVersionCollector('v12.3.15')
  ];

  // these are my custom collectors - added to the standard collectors.
  const custom = [
    new CustomCollector('passed value in a custom collector')
  ];

  // this aggregates the collected data into a response
  const producer = new rciSdk.Producer(transport, defaults.concat(customPreDefined, custom));

  rciSdk.TriggerHelper.waitAndTrigger({
    ...rciSdk.TriggerHelper.defaultWaitAndTriggerOptions, producer
  });
}

// eslint-disable-next-line no-undef
const tenancyId = '123-456';
const {RCICoreReady} = window;

// Path 1: Trigger the RCI instrumentation bootstrap process straight away
if (RCICoreReady === true) {
  rciMainAction(tenancyId, window.rciSdk);
// Path 2: Bind on event and wait for dispatch
} else {
  window.addEventListener('RCICoreReady', () => {
    waitUntil(() => window.RCICoreReady === true, 10).then(() => {
      rciMainAction(tenancyId, window.rciSdk);
    });
  });
}
