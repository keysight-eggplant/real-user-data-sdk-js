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

  async function timeout (ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  /** Check for domComplete values to be populated by the browser */
  async function condition () {
    return !!(window.performance && window.performance.timing && ((window.performance.timing.domComplete - window.performance.timing.navigationStart) > 0));
  }

  async function action () {
    try {
      await producer.collect();
    } catch (cause) {
      // Failed to process event
    }
  }


  /**
   * Waits for something to happen and the triggers
   * @param {Object} options
   * @param {Number} options.interval
   * @param {Number} options.timeout
   * @param {Function} options.condition
   * @param {Function} options.action
   * @returns {Promise<void>}
   */
  async function waitAndTrigger (options) {
    let intervalCollector = 0;

    let maxIterations = options.timeout / options.interval;

    for (let i = 0; i < maxIterations; i++) {
      intervalCollector += options.interval;
      if (await options.condition()) {
        await options.action();
        break;
      } else {
        if (intervalCollector === options.timeout) {
          await options.action();
          break;
        }
      }

      await timeout(options.interval);
    }
  }

  window.addEventListener('load', async () => {
    await waitAndTrigger({interval: 1, condition: condition, action: action, timeout: 1000});
  });

})('123-456', rciSdk);
