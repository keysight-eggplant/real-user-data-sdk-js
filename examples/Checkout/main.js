((tenancyId, rciSdk) => {
	// Step 1: Create your Checkout Collector
	const checkoutCollector = new rciSdk.collectors.CheckoutCollector();

	// Step 2: Configure your Transport with the tenancyId provided
	const transport = new rciSdk.Transport(tenancyId);

	// Step 3: Capture your default collectors
	const defaults = rciSdk.collections.defaultCollection;

	// Step 4: Capture your custom collectors
	const custom = [checkoutCollector];

	// Step 5: Build a new Collector with transport and merged collectors
	const collector = new rciSdk.Collector(transport, defaults.concat(custom));

	// Step 6: Register your hook
	document.addEventListener('DOMContentLoaded', async () => {
		try {
			// Step 7: Feed in the ecommerce data
			checkoutCollector.checkout(
					'transaction',
					4900,
					'USD'
			);

			// Step 8: Collect and send the event
			await collector.collect();

			// Step 9: Clear the ecommerce data
			checkoutCollector.clear();
		} catch(cause) {
			console.log("Error processing event", cause);
		}
	});

})("123-456", rciSdk);