import React, { useState } from 'react';
import rciSdk from '@eggplantio/real-user-data-sdk-js';


export default function ShowUser() {

  const [name, setName] = useState('MoHo');

  function handleSetName(newName) {
    setName(newName);
    console.log('clicked');
    console.log(rciSdk);
    console.log(rciSdk.Transport);

    // ((tenancyId, rciSdk) => {
    //   // Step 1: Configure your Transport with the tenancyId provided
    //   const targetUrl = `https://event.real-user-data.eggplant.cloud/v1/${tenancyId}/stream`;
    //   const transport = new rciSdk.Transport(targetUrl);

    //   // Step 2: Capture your default collectors
    //   const defaults = rciSdk.collector.defaultCollectors;

    //   // Step 3: Build a new Producer with transport and collector
    //   const producer = new rciSdk.Producer(transport, defaults);

    //   // Step 4: Register your hook
    //   // Caution: There may already be an onload registered - in which case use a decorator pattern.
    //   window.onload = async () => {
    //     try {
    //       // Step 5: Collect and send the event
    //       await producer.collect();
    //     } catch (cause) {
    //       console.log('Error processing event', cause);
    //     }
    //   };

    // })('123-456', rciSdk);

  }

  return (
    <div>
      <p>Name:  {name}</p>
      <button onClick={() =>handleSetName('Morgan')}>
        Click me
      </button>
    </div>
  );
}