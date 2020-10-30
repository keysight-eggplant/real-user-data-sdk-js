import InstrumentationVersionCollector from './InstrumentationVersionCollector';

const coreVersion = 'v11.2.9';

jest.mock('../core/version.constant', () => ({
  __esModule: true, // this property makes it work
  default: 'v11.2.9'
}));

describe('InstrumentationVersionCollector', () => {
  const originalEvent = {
    id: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
    clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
    eventType: 'state',
    eventAction: 'load',
    eventSource: 'products/shoes/1',
    eventCategory: 'products/shoes',
    deviceType: 'mobile'
  };

  const instrumentationVersionHash = '87a97607d305fab320c8837e4f802bc89b8d52b6';
  const instrumentationVersion = '11.2.9';

  /** @type {Event} */
  const expectedEventWithCore = {
    ...originalEvent,
    softwareInfo5: coreVersion
  };

  /** @type {Event} */
  const expectedEventWithCoreAndInstrumentationAsHash = {
    ...originalEvent,
    softwareInfo5: `${coreVersion}_87a97607`
  };

  /** @type {Event} */
  const expectedEventWithCoreAndInstrumentationAsVersion = {
    ...originalEvent,
    softwareInfo5: `${coreVersion}_${instrumentationVersion}`
  };
  let instrumentationVersionCollector;

  describe('with no instrumentation version passed', () => {
    beforeEach(() => {
      instrumentationVersionCollector = new InstrumentationVersionCollector();
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await instrumentationVersionCollector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEventWithCore);
    });

    test('Return event with the core version if an instrumentation version is not passed', async () => {
      /** @type {Event} */
      const actualEvent = await instrumentationVersionCollector.prepare(originalEvent);

      expect(actualEvent.softwareInfo5).toEqual(coreVersion);
    });
  });

  describe('with no instrumentation version passed as hash', () => {
    beforeEach(() => {
      instrumentationVersionCollector = new InstrumentationVersionCollector(instrumentationVersionHash);
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await instrumentationVersionCollector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEventWithCoreAndInstrumentationAsHash);
    });

    test('Return event with the core version if an instrumentation version is passed as hash', async () => {
      /** @type {Event} */
      const actualEvent = await instrumentationVersionCollector.prepare(originalEvent);

      expect(actualEvent.softwareInfo5).toEqual(expectedEventWithCoreAndInstrumentationAsHash.softwareInfo5);
    });
  });

  describe('with no instrumentation version passed as version', () => {
    beforeEach(() => {
      instrumentationVersionCollector = new InstrumentationVersionCollector(instrumentationVersion);
    });

    test('Return event with all mandatory fields', async () => {
      /** @type {Event} */
      const actualEvent = await instrumentationVersionCollector.prepare(originalEvent);

      expect(actualEvent).toEqual(expectedEventWithCoreAndInstrumentationAsVersion);
    });

    test('Return event with the core version if an instrumentation version is passed as version', async () => {
      /** @type {Event} */
      const actualEvent = await instrumentationVersionCollector.prepare(originalEvent);

      expect(actualEvent.softwareInfo5).toEqual(expectedEventWithCoreAndInstrumentationAsVersion.softwareInfo5);
    });
  });


});
