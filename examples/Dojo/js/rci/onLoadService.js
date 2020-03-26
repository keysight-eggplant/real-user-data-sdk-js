define('rci/onLoadService', ['rci/producerFactory'],
    (producerFactory) => {
        function trigger() {
            // TODO: Define any custom timing for this event
            const payload = {
                eventEnd: new Date().getTime()
            };

            producerFactory(payload).collect();
        }

        return {
            trigger: trigger
        }
    });