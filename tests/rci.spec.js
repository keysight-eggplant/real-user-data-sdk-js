const localStorageClientIdKey = 'eggplantRciClientId';
const expectedErrorCode = 402;
const expectedErrorType = 'Payment Required';
const expectedErrorFatal = false;
const expectedEventAction = 'backflip';
const expectedEventType = 'state';
const expectedEventCategory = 'sandwiches';
const expectedGoalValue = 4900;
const expectedGoalType = 'checkout';
const expectedGoalCurrency = 'USD';

before(async () => {
  class LocalTransport {
    async execute(event) {
      window.assertOnMe = event;
    }
  }

  const collection = [
    new rciSdk.collectors.ClientIdCollector(localStorage),
    new rciSdk.collectors.ConversionCollector().success(expectedGoalType, expectedGoalValue, expectedGoalCurrency),
    new rciSdk.collectors.DeviceTypeCollector(),
    new rciSdk.collectors.ErrorCollector(expectedErrorCode, expectedErrorType, expectedErrorFatal),
    new rciSdk.collectors.EventActionCollector(expectedEventAction),
    new rciSdk.collectors.EventTypeCollector(expectedEventType),
    new rciSdk.collectors.IdCollector(),
    new rciSdk.collectors.StopJourneyActionCollector(),
    new rciSdk.collectors.TimingCollector(),
    new rciSdk.collectors.UriWithCustomCategoryCollector(expectedEventCategory)
  ];
  const collector = new rciSdk.Collector(new LocalTransport(), collection);

  await collector.collect();
});

describe('rciJsSdk', () => {
  it('should return event with correct values set', () => {
    expect(window.assertOnMe.clientId).equal(localStorage.getItem(localStorageClientIdKey));
    expect(window.assertOnMe.deviceType).to.not.equal(null);
    expect(window.assertOnMe.deviceType).to.be.a('string');
    expect(window.assertOnMe.errorCode).equal(expectedErrorCode);
    expect(window.assertOnMe.errorType).equal(expectedErrorType);
    expect(window.assertOnMe.errorFatal).equal(expectedErrorFatal);
    expect(window.assertOnMe.eventAction).equal(expectedEventAction);
    expect(window.assertOnMe.eventType).equal(expectedEventType);
    expect(window.assertOnMe.id).to.not.equal(null);
    expect(window.assertOnMe.journeyAction).equal(rciSdk.JOURNEY_ACTION.STOP);
    expect(window.assertOnMe.eventStart).to.not.equal(null);
    expect(window.assertOnMe.eventStart).to.be.a('number');
    expect(window.assertOnMe.eventEnd).to.not.equal(null);
    expect(window.assertOnMe.eventEnd).to.be.a('number');
    expect(window.assertOnMe.eventSource).to.not.equal(null);
    expect(window.assertOnMe.eventSource).to.be.a('string');
    expect(window.assertOnMe.eventCategory).equal(expectedEventCategory);
    expect(window.assertOnMe.goalType).equal(expectedGoalType);
    expect(window.assertOnMe.goalCurrency).equal(expectedGoalCurrency);
    expect(window.assertOnMe.goalValue).equal(expectedGoalValue);

  });
});
