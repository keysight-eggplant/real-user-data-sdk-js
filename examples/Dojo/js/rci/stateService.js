define('rci/stateService', ['dojo/router', 'dojo/dom', 'rci/producerFactory'],
    (router, dom, producerFactory) => {
      const route = "/.*";
      let startTime;

      // Start the navigation timing before route executes
      router.registerBefore(route, (event) => {
        startTime = new Date().getTime();
      });

      // Trigger the event after route completes
      router.register(route, (event) => {
        const payload = {
          eventStart: startTime,
          eventEnd: new Date().getTime(),
          eventAction: 'dojo/router',
          eventCategory: event.newPath,
          referrer: event.oldPath
        };

        // TODO: Implement any route specific collection
        if (/\/checkout/i.test(payload.eventCategory)) {
          payload.goalType = dom.byId('rci-goal-type').value;
          payload.goalValue = parseInt(dom.byId('rci-goal-value').value, 10);
          payload.goalCurrency = dom.byId('rci-goal-currency').value;
        }

        producerFactory(payload).collect();

        // Reset timing
        startTime = null;
        });
    });