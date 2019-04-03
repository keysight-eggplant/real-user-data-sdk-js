const localStorageClientIdKey = "eggplantRciClientId";

var expectedErrorCode = 402;
var expectedErrorType = 'Payment Required';
var expectedErrorFatal = false;
var expectedEventAction = 'backflip';
var expectedEventType = 'state';
var expectedEventCategory = 'sandwiches';

before(async () => {
    class LocalTransport {
        async execute(event) {
            window.assertOnMe = event;
        }
    }

    const collector = new rciSdk.Collector(new LocalTransport(), null)
        .add(new rciSdk.collectors.ClientIdCollector(localStorage))
        .add(new rciSdk.collectors.DeviceTypeCollector())
        .add(new rciSdk.collectors.ErrorCollector(expectedErrorCode, expectedErrorType, expectedErrorFatal))
        .add(new rciSdk.collectors.EventActionCollector(expectedEventAction))
        .add(new rciSdk.collectors.EventTypeCollector(expectedEventType))
        .add(new rciSdk.collectors.IdCollector())
        .add(new rciSdk.collectors.StopJourneyActionCollector())
        .add(new rciSdk.collectors.TimingCollector())
        .add(new rciSdk.collectors.UriWithCustomCategoryCollector(expectedEventCategory));

    await collector.collect();
});

describe('rciJsSdk', function() {
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
        expect(window.assertOnMe.journeyAction).equal('stop');
        expect(window.assertOnMe.eventStart).to.not.equal(null);
        expect(window.assertOnMe.eventStart).to.be.a('number');
        expect(window.assertOnMe.eventEnd).to.not.equal(null);
        expect(window.assertOnMe.eventEnd).to.be.a('number');
        expect(window.assertOnMe.eventSource).to.not.equal(null);
        expect(window.assertOnMe.eventSource).to.be.a('string');
        expect(window.assertOnMe.eventCategory).equal(expectedEventCategory);
    });
});
