define('rci/actionService', ['jquery', 'rci/producerFactory'],
    (jquery, producerFactory) => {
      const attributeName = "rci-action-trigger";

      function register() {
        // Trigger the event on click of any element with the given attribute
        jquery('body').on('click', `[${attributeName}]`, (event) => {
          // Use the target element
          const target = jquery(event.target);

          // Capture the id (if there is one)
          const id = target.attr('id');

          // Capture the attribute value
          const eventCategory = target.attr(attributeName);

          if (!eventCategory) {
            console.error('Unable to send event, eventCategory required.')
          }

          // Pluck attributes which best describe the object
          const eventSource = id ? `#${id}` : `[${attributeName}=${eventCategory}]`;

          const payload = {
            eventStart: new Date().getTime(),
            eventEnd: new Date().getTime(),
            eventAction: 'click',
            eventType: 'action',
            eventSource: eventSource,
            eventCategory: target.attr(attributeName),
            referrer: window.location.href
          };

          // TODO: Implement any element specific collection
          if (id === 'rci-dojo-example-3') {
            payload.goalType = jquery('#rci-goal-type').val();
            payload.goalValue = parseInt(jquery('#rci-goal-value').val(), 10);
            payload.goalCurrency = jquery('#rci-goal-currency').val();
          }

          producerFactory(payload).collect();
        });
      }

      return {
        register: register
      }
    });