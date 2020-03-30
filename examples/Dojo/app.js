require(['dojo/router', 'dijit/form/Button', 'dojo/topic', 'rci/actionService', 'rci/stateService', 'rci/readyService', 'dojo/domReady!'],
    (router, Button, topic, actionService) => {

      // Set up routes
      [
        ['rci-router-trigger-1', '/rci/router/trigger/1'],
        ['rci-router-trigger-2', '/rci/router/trigger/2'],
        ['rci-router-trigger-checkout', '/rci/router/trigger/checkout']
      ].forEach((config) => {
        // Registers the button
        const button = new Button({
          label: config[1],
        },  config[0]);

        // Sets the event handling for the button
        button.on("click", (e) => {
          router.go(config[1]);
        });
      });

      // Set up topic publishers
      [
        ['rci-action-trigger-1', '/rci/action/trigger/1'],
        ['rci-action-trigger-2', '/rci/action/trigger/2'],
        ['rci-action-trigger-checkout', '/rci/action/trigger/checkout']
      ].forEach((config) => {
        // Registers the button
        const button = new Button({
          label: config[1],
        },  config[0]);

        // Sets the event handling for the button
        button.on("click", (e) => {
          topic.publish(actionService.eventName, {
            eventSource: config[0],
            eventCategory: config[1],
            eventInfo1: "some-custom-information"
          });
        });
      });

      // Start router
      router.startup();
    });