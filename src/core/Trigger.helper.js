export default class TriggerHelper {
    static async timeout (ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    static async action (producer) {
        try {
            console.log('Here 1');
            console.log('Here 1');
            await producer.collect();
            console.log('Here 2');
            console.log('Here 2');
        } catch (cause) {
            console.log(cause);
            // Failed to process event
        }
    }

    /**
     * Waits for something to happen and then triggers
     * @param {{producer: {collect: collect}}} options
     * @param {Number} options.interval
     * @param {Number} options.timeout
     * @param {Class} options.producer
     * @param {Object} options.event
     * @param {Function} options.condition
     * @param {Function} options.action
     * @returns {Promise<void>}
     */
    static async waitAndTrigger (options) {
        let intervalCollector = 0;

        let maxIterations = options.timeout / options.interval;

        for (let i = 0; i < maxIterations; i++) {
            intervalCollector += options.interval;
            console.log(intervalCollector);
            if (await options.condition()) {
                await options.action(options.producer);
                break;
            } else {
                if (intervalCollector === options.timeout) {
                    await options.action(options.producer);
                    break;
                }
            }

            await TriggerHelper.timeout(options.interval);
        }
    }


}