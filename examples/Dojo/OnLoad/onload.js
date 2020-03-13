((tenancyId, rciSdk) => {
    // Step 1: Configure your Transport with the tenancyId provided
    const targetUrl = `https://target.domain/v1/${tenancyId}/stream`;
    const transport = new rciSdk.Transport(targetUrl);

    // Step 2: Capture your default collectors
    const defaults = rciSdk.collector.defaultCollectors;

    // Step 3: Build a new Producer with transport and collector
    const producer = new rciSdk.Producer(transport, defaults);

    // Step 4: Register your hook
    // Caution: There may already be an onload registered - in which case use a decorator pattern.

    /** Check for domComplete values to be populated by the browser */
    async function condition () {
        return !!(window.performance && window.performance.timing && ((window.performance.timing.domComplete - window.performance.timing.navigationStart) > 0));
    }


    window.addEventListener('load', async () => {
        await rciSdk.TriggerHelper.waitAndTrigger({interval: 1, condition: condition, action: rciSdk.TriggerHelper.action, timeout: 1000, producer: producer});
    });

})('123-456', rciSdk);
