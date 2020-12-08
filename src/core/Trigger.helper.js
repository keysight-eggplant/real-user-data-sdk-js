/* eslint-disable no-plusplus */
/* eslint no-await-in-loop: 0 */
export default class TriggerHelper {

  static onLoadTriggered = false;

  /** @type {number} - To be used within {@link WaitAndTriggerOptions.interval} */
  static defaultInterval = 5;
  /** @type {number} - To be used within {@link WaitAndTriggerOptions.timeout} */
  static defaultTimeout = 1000;

  static async timeout (ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  static async action (producer) {
    try {
      await producer.collect();
    } catch (error) {
      console.log(error);
      // Failed to process event
    }
  }

  static async windowOnload () {
    if (TriggerHelper.onLoadTriggered === true) {
      return true;
    } else {
      return new Promise((resolve, reject) => {
        window.onload = () => {
          TriggerHelper.onLoadTriggered = true;
          resolve(TriggerHelper.onLoadTriggered);
        };
      });
    }
  }

  static async defaultCondition () {
    try {
      const legacyPerf = !!(window.performance && window.performance.timing
          && ((window.performance.timing.domComplete - window.performance.timing.navigationStart) > 0));
      let newPerf = performance.getEntriesByType('navigation')[0];
      newPerf = ((newPerf.domComplete - newPerf.startTime) > 0);
      const documentReady = (document.readyState === 'complete' || document.readyState === 'interactive');
      const onloadTriggered = await TriggerHelper.windowOnload();

      console.log(legacyPerf && newPerf && documentReady);
      return legacyPerf && newPerf && documentReady && onloadTriggered;
    } catch (e) {
      return true;
    }
  }

  /**
   * @typedef {Object} WaitAndTriggerOptions
   * @property {{producer: {collect: collect}}} options
   * @property {Number} interval - How often the polling should happen
   * @property {Number} timeout - Maximum timeout. No polling will occur after this time
   * @property {Class} producer
   * @property {Object} event
   * @property {Function|Promise} condition
   * @property {Function|Promise} action
   * */

  /** @type {WaitAndTriggerOptions} */
  static defaultWaitAndTriggerOptions = {
    interval: TriggerHelper.defaultInterval,
    condition: TriggerHelper.defaultCondition,
    action: TriggerHelper.action,
    timeout: TriggerHelper.defaultTimeout
  };

  /**
     * Waits for something to happen and then triggers
     * @param {WaitAndTriggerOptions} options
     * @returns {Promise<void>}
     */
  static async waitAndTrigger (options) {
    let intervalCollector = 0;

    const maxIterations = Math.ceil(options.timeout / options.interval);

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
