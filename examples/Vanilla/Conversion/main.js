((tenancyId, rciSdk) => {
	// Step 1: Create your Checkout Collector
	const conversionCollector = new rciSdk.collectors.ConversionCollector();

	// Step 2: Configure your Transport with the tenancyId provided
	const transport = new rciSdk.Transport(tenancyId);

	// Step 3: Capture your default collectors
	const defaults = rciSdk.collections.defaultCollection;

	// Step 4: Capture your custom collectors
	const custom = [conversionCollector];

	// Step 5: Build a new Collector with transport and merged collectors
	const collector = new rciSdk.Collector(transport, defaults.concat(custom));

	// Step 6: Register your hook
	const checkout = document.getElementById("checkout-form");
	checkout.addEventListener('submit', async (e) => {
		try {
			e.preventDefault();

			// Step 7: Identify your converting condition
			const success = document.getElementById("checkout-form-success");
			if (success.checked) {
				// Step 8a: Feed in the ecommerce data
				conversionCollector.checkout(
						'transaction',
						4900,
						'USD'
				);

				// Step 8b: Collect and send the converting event
				await collector.collect();

				// Step 8c: Clear the ecommerce data
				conversionCollector.clear();
			} else {
				// Step 9b: Collect and send the non-converting event
				await collector.collect();
			}
		} catch(cause) {
			console.log("Error processing event", cause);
		}
	});

})("123-456", rciSdk);