/* eslint-disable no-plusplus */
/* eslint no-await-in-loop: 0 */
import PerformanceServiceFactory from './performance/PerformanceServiceFactory';
import ErrorCollector from '../collector/ErrorCollector';

const pjson = require('../../package.json');

const performanceServiceFactory = new PerformanceServiceFactory();

export default class TriggerHelper {

  /** @type {number} - To be used within {@link WaitAndTriggerOptions.interval} */
  static defaultInterval = 10;

  /** @type {number} - To be used within {@link WaitAndTriggerOptions.timeout} */
  static defaultTimeout = 1000;

  /**
   * Perform an action once conditions have been met
   * @param {class} producer
   */
  static async action (producer) {
    await producer.collect();
  }

  /**
   * Perform an action once conditions have been met
   * @param {class} producer
   * @returns {boolean}
   */
  static async defaultCondition () {
    const performanceService = performanceServiceFactory.create();
    const performanceStatus = await performanceService.getStatus();
    return document.readyState === 'complete'
      && performanceStatus === performanceService.STATUS.COMPLETE;
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
   * Poll for condition to be met
   * @param {function} callback
   * @param {number} interval
   * @param {number} timeout
   */
  static async repeatUntil(callback, interval, timeout) {
    let triesLeft = Math.ceil(timeout / interval);
    return new Promise((resolve, reject) => {
      const handler = setInterval(async () => {
        try {
          // Condition or timeout
          if (await callback() === true || triesLeft <= 1) {
            resolve();
            clearInterval(handler);
          }
        } catch (e) {
          reject(ErrorCollector.ERROR_CODES.TRIGGER_CONDITION_FAILED);
        }
        triesLeft--;
      }, interval);
    });
  }

  /**
     * Waits for something to happen and then triggers
     * @param {WaitAndTriggerOptions} options
     * @returns {Promise<void>}
     */
  static async waitAndTrigger (options) {
    const {interval} = options;
    const {condition} = options;
    const {action} = options;
    const {timeout} = options;
    const {producer} = options;

    return this.repeatUntil(condition, interval, timeout)
      .then(async() => {
        try {
          await action(producer);
        } catch (e) {
          await producer.error(
            ErrorCollector.ERROR_CODES.TRIGGER_ACTION_FAILED,
            pjson.name,
            false
          );
        }
      })
      .catch(async (errorCode) => {
        if (!errorCode) {
          errorCode = ErrorCollector.ERROR_CODES.TRIGGER_HANDLER_FAILED;
        }

        await producer.error(
          errorCode,
          pjson.name,
          false
        );
      });
  }
}
