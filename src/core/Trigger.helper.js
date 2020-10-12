/* eslint-disable no-plusplus */
/* eslint no-await-in-loop: 0 */
export default class TriggerHelper {
  static async timeout (ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  static async action (producer) {
    try {
      await producer.collect();
    } catch (cause) {
      // Failed to process event
    }
  }

  static async defaultCondition () {
    try {
      const perf = !!(window.performance && window.performance.timing && ((window.performance.timing.domComplete - window.performance.timing.navigationStart) > 0));

      let paintReady = false;
      const po = new PerformanceObserver((entryList) => {
        paintReady = entryList.getEntries().length > 0;
      });

      // Observe entries of type `largest-contentful-paint`, including buffered entries,
      // i.e. entries that occurred before calling `observe()` below.
      po.observe({
        entryTypes: ['paint']
      });

      return perf && paintReady;
    } catch (e) {
      return true;
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

    const maxIterations = options.timeout / options.interval;

    for (let i = 0; i < maxIterations; i++) {
      intervalCollector += options.interval;
      if (await options.condition()) {
        await options.action(options.producer);
        break;
      } else if (intervalCollector >= options.timeout) {
        await options.action(options.producer);
        break;
      }

      await TriggerHelper.timeout(options.interval);
    }
  }


}
