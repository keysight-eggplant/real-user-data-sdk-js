(async (tenancyId, rciSdk) => {
  // Step 1: Define your Factory
  const rciSdkProducerFactory = (customCollectors) => {
    const targetUrl = `https://event.dev.real-user-data.webperfdev.com/v1/${tenancyId}/stream`;
    const transport = new rciSdk.Transport(targetUrl);
    const defaults = rciSdk.collector.defaultCollectors;
    const collection = defaults.concat(customCollectors);
    return new rciSdk.Producer(transport, collection);
  };

  // Step 2: Catch your error
  try {
    // Perform an action, such as state transition or checkout.
    throw new TypeError('Oh no!  Something unexpected happened');
  } catch (e) {
    // Step 3: Provide your error data
    const errorCollector = new rciSdk.collector.ErrorCollector(
      e.name,
      e.message,
      true
    );

    // Step 4: Change the event type to error
    const eventTypeCollector = new rciSdk.collector.EventTypeCollector(rciSdk.EVENT_TYPE.ERROR);
    const eventActionCollector = new rciSdk.collector.EventActionCollector(rciSdk.EVENT_ACTION.STATE_LOAD_PARTIAL);

    // Step 5: Merge default and custom collectors
    const customCollection = [eventTypeCollector, eventActionCollector, errorCollector];

    // Step 6: Collect and send the event
    await rciSdkProducerFactory(customCollection).collect();
  }

})('39ea5e34-f96e-47e6-9a28-f0bf430c3fa7', rciSdk);
