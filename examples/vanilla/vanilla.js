// Configure
((tenancyId, rciSdk) => {
	const customRule = () => {
		return async (event) => {
			event.hardwareInfo1 = "something";

			return event;
		}
	};

	const baseCollector = new rciSdk.Collector(new rciSdk.Transport(tenancyId))
		.add(rciSdk.collectors.clientIdFromLocalStorageCollector("rci-client-id"));

	window.stateCollector = baseCollector.clone()
		.add(rciSdk.collectors.eventTypeCollector(rciSdk.EVENT_TYPE.STATE))
		.add(customRule());

	window.errorCollector = baseCollector.clone()
		.add(rciSdk.collectors.eventTypeCollector(rciSdk.EVENT_TYPE.ERROR));

})("123-456", rciSdk);

// Hook
((rci, stateCollector, errorCollector) => {
	document.addEventListener('DOMContentLoaded', async () => {
		try {
			await stateCollector.clone()
				.add(rciSdk.collectors.eventActionCollector("full-load"))
				.add(async function inlineFunction(event) {
					// Do Something in-line
					return event;
				})
				.collect();

		} catch(cause) {
			console.log("Error processing event", cause);
			await errorCollector.clone()
				.add(rciSdk.collectors.errorCollector(500, cause.message, false))
				.collect();
		}
	});

})(rciSdk, stateCollector, errorCollector);