((tenancyId, rciSdk) => {
	// Step 1: Configure your Transport with the tenancyId provided
	const transport = new rciSdk.Transport(tenancyId);

	// Step 2: Capture your default collectors
	const defaults = rciSdk.collections.defaultCollection;

	// Step 3: Build a new Collector with transport and collectors
	const collector = new rciSdk.Collector(transport, defaults);

	// Step 4: Register your hook
	document.addEventListener('DOMContentLoaded', async () => {
		try {
			// Step 5: Collect and send the event
			await collector.collect();
		} catch(cause) {
			console.log("Error processing event", cause);
		}
	});

})("123-456", rciSdk);