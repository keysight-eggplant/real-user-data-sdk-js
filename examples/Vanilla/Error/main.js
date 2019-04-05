(async (tenancyId, rciSdk) => {
  // Step 1: Define your Factory
  const rciSdkProducerFactory = (customCollectors) => {
    const targetUrl = `https://target.domain/v1/${tenancyId}/stream`;
    const transport = new rciSdk.Transport(targetUrl);
    const defaults = rciSdk.collector.defaultCollectors;
    const collection = defaults.concat(customCollectors);
    return new rciSdk.Producer(transport, collection);
  };

  // Step 2: Catch your error
  try {
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

    // Step 5: Merge default and custom collectors
    const customCollection = [eventTypeCollector, errorCollector];

    // Step 6: Collect and send the event
    await rciSdkProducerFactory(customCollection).collect();
  }

})('123-456', rciSdk);
