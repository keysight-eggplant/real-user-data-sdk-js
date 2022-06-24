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

const configuredTenancies = [
  {
    name: 'E2E Test', // non-matching target
    targetUrl: 'http://localhost:3005/v1/111-222/stream',
    tenancyId: '111-222',
    target: {
      targetedData: 'URLHost',
      searchMode: 'perfectMatch',
      searchValue: 'example.com:8232'
    }
  },
  {
    name: 'Beacon Generator 1', // matching target
    targetUrl: 'http://localhost:3005/v1/333-444/stream',
    tenancyId: '333-444',
    target: {
      targetedData: 'CanonicalLinks',
      searchMode: 'perfectMatch',
      searchValue: 'http://example.com/'
    }
  }
];

function rciMainAction (tenancies, rciSdk) {
  // eslint-disable-next-line no-undef
  const bootstrapped = new rciSdk.Bootstrapper({
    tenancies,
    collectors: [
      ...rciSdk.collector.defaultCollectors,
      ...rciSdk.collector.webFocusedCollectors,
      new rciSdk.collector.InstrumentationVersionCollector('v12.3.15'),
      new CustomCollector('passed value in a custom collector')
    ]
  }, rciSdk.Transport, rciSdk.Producer);

  rciSdk.TriggerHelper.waitAndTrigger({
    ...rciSdk.TriggerHelper.defaultWaitAndTriggerOptions, producer: bootstrapped.producer
  });
}

// eslint-disable-next-line no-undef
const {RCICoreReady} = window;

// Path 1: Trigger the RCI instrumentation bootstrap process straight away
if (RCICoreReady === true) {
  rciMainAction(configuredTenancies, window.rciSdk);
// Path 2: Bind on event and wait for dispatch
} else {
  window.addEventListener('RCICoreReady', () => {
    waitUntil(() => window.RCICoreReady === true, 10).then(() => {
      rciMainAction(configuredTenancies, window.rciSdk);
    });
  });
}
