let rciClientIdKey = "rci-client-id";
let rciDeviceTypeKey = "rci-device-type";

before(async () => {
    class LocalTransport {
        async execute(event) {
            window.assertOnMe = event;
        }
    }

    const collector = new rciSdk.Collector(new LocalTransport())
        .add(rciSdk.collectors.clientIdFromLocalStorageCollector(rciClientIdKey))

    await collector.collect();
});
describe('rciJsSdk', function() {
    it('should return event with correct values set', () => {
        expect(window.assertOnMe.clientId).equal(localStorage.getItem(rciClientIdKey));
    });
});