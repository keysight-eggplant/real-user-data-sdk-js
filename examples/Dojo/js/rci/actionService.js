define('rci/actionService', ['dojo/topic', 'dojo/dom', 'rci/producerFactory'],
    (topic, dom, producerFactory) => {
      const eventName = "rci/action/trigger";

      topic.subscribe(eventName, (e) => {
        if (!e.eventCategory || !e.eventSource) {
          console.error('Unable to send event, eventCategory and eventSource required.')
        }

        const payload = {
          eventStart: new Date().getTime(),
          eventEnd: new Date().getTime(),
          eventAction: 'click',
          eventType: 'action',
          referrer: window.location.href,
          ...e
        };

        // TODO: Implement any element specific collection
        if (/checkout/i.test(e.eventCategory)) {
          payload.goalType = dom.byId('rci-goal-type').value;
          payload.goalValue = parseInt(dom.byId('rci-goal-value').value, 10);
          payload.goalCurrency = dom.byId('rci-goal-currency').value;
        }

        producerFactory(payload).collect();
      });

      return {
        eventName: eventName
      }
    });