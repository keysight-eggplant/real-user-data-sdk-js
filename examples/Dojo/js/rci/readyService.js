define('rci/readyService', ['rci/producerFactory', 'dojo/domReady!'],
    (producerFactory) => {
        // TODO: Define any custom timing for this event
        const payload = {
            eventAction: 'dojo/ready',
            eventEnd: new Date().getTime()
        };

        producerFactory(payload).collect();
    });