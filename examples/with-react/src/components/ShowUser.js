import React, { useState } from 'react';
import * as rciSdk from '@eggplantio/real-user-data-sdk-js';


export default function ShowUser() {

  const [name, setName] = useState('MoHo');

  function handleSetName(newName) {
    setName(newName);

     ((tenancyId, rciSdk) => {
      // Step 1: Configure your Transport with the tenancyId provided
      const targetUrl = `https://event.real-user-data.eggplant.cloud/v1/${tenancyId}/stream`;
      const transport = new rciSdk.Transport(targetUrl);

      // Step 2: Capture your default collectors
      const defaults = rciSdk.collector.defaultCollectors;
      // console.log(defaults);

      // Step 3: Build a new Producer with transport and collector
      const producer = new rciSdk.Producer(transport, defaults);
      // console.log(producer);

      // Step 4: Register your hook
       (async function send () {
        try {
          // Step 5: Collect and send the event
          await producer.collect();
        } catch (cause) {
          console.log('Error processing event', cause);
        }
      })();

    })('b2404178-266b-4cbc-bf42-e389c5650733', rciSdk);
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