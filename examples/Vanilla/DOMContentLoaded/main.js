((tenancyId, rciSdk) => {
  // Step 1: Configure your Transport with the tenancyId provided
  const targetUrl = `https://event.dev.real-user-data.webperfdev.com/v1/${tenancyId}/stream`;
  const transport = new rciSdk.Transport(targetUrl);

  // Step 2: Capture your default collectors
  const defaults = rciSdk.collector.defaultCollectors;

  // Step 3: Build a new Producer with transport and collector
  const producer = new rciSdk.Producer(transport, defaults);

  // Step 4: Register your hook
  // document.addEventListener('DOMContentLoaded', async () => {
  //   try {
  //     // Step 5: Collect and send the event
  //     await producer.collect();
  //   } catch (cause) {
  //     console.log('Error processing event', cause);
  //   }
  // });

  document.addEventListener('DOMContentLoaded', collectEvent);

  function collectEvent() {
    console.log('collect');
    producer.collect();
  }

})('39ea5e34-f96e-47e6-9a28-f0bf430c3fa7', rciSdk);
