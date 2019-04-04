(async (tenancyId, rciSdk) => {
	// Step 1: Define your Factory
	const rciSdkCollectorFactory = (customCollectors) => {
		const transport = new rciSdk.Transport(tenancyId);
		const defaults = rciSdk.collections.defaultCollection;
		const collection = defaults.concat(customCollectors);
		return new rciSdk.Collector(transport, collection);
	};

	// Step 2: Catch your error
	try {
		throw new TypeError('Oh no!  Something unexpected happened');
	} catch(e) {
		const errorCollector = new rciSdk.collectors.ErrorCollector(
			e.name,
			e.message,
			true
		);
		const eventTypeCollector = new rciSdk.collectors.EventTypeCollector(rciSdk.EVENT_TYPE.ERROR);
		const customCollection = [eventTypeCollector, errorCollector];
		await rciSdkCollectorFactory(customCollection).collect();
	}

})("123-456", rciSdk);