define('rci/producerFactory', ['rci/sdk'], (rciSdk) => {
  // TODO: Define target URL
  const targetUrl = `http://localhost:3000/v1/123/stream`;
  const transport = new rciSdk.Transport(targetUrl);

  // TODO: Define any geographic collectors
  // TODO: Define any hardware/software collectors
  // TODO: Define any timing collectors
  // TODO: Define any monetary collectors
  const customCollectors = [];

  // Expose the factory
  return (payload) => {
    // Merge custom collectors for this event
    let collection = [];
    collection = collection.concat(customCollectors);
    collection = collection.concat(rciSdk.collector.defaultCollectors);
    collection.push({
      prepare: async (event) => {
        Object.entries(payload).forEach(([key, value]) => {
          event[key] = value;
        });
        return event;
      }
    });

    // Return the Producer instance
    return new rciSdk.Producer(transport, collection);
  }
});