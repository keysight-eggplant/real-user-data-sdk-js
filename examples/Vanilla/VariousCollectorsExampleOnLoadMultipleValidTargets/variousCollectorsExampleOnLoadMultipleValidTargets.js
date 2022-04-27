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
    targetUrl: 'http://localhost:3000/v1/111-222/stream',
    tenancyId: '111-222',
    target: {
      targetedData: 'URLHost',
      searchMode: 'perfectMatch',
      searchValue: 'example.com:8232'
    }
  },
  {
    name: 'Beacon Generator 1', // matching target
    targetUrl: 'http://localhost:3000/v1/333-444/stream',
    tenancyId: '333-444',
    target: {
      targetedData: 'URLPathName',
      searchMode: 'partialMatch',
      searchValue: 'index.html'
    }
  },
  {
    name: 'Mitsubishi', // non-matching target
    targetUrl: 'http://localhost:3000/v1/555-666/stream',
    tenancyId: '111-222',
    target: {
      targetedData: 'URLPathName',
      searchMode: 'partialMatch',
      searchValue: '/lorem/ipsum/dolor'
    }
  },
  {
    name: 'Fujitsu', // matching target
    targetUrl: 'http://localhost:3000/v1/777-888/stream',
    tenancyId: '111-222',
    target: {
      targetedData: 'URLPathName',
      searchMode: 'partialMatch',
      searchValue: 'examples/Vanilla/'
    }
  }
];

function rciMainAction (tenancies, rciSdk) {
  // eslint-disable-next-line no-undef
  const transport = new rciSdk.Transport(tenancies);

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
