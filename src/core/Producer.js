/* eslint no-await-in-loop: 0 */
import ErrorCollector from '../collector/ErrorCollector';

export default class Producer {

  constructor(transport, collectors) {
    this.transport = transport;
    this.collectors = Array.isArray(collectors) ? [].concat(collectors) : [];
  }

  async collect() {
    const event = await this.prepareData(this.collectors);
    await this.transport.execute(event);
  }

  /**
   * Send events augmented with the standard error type
   * @param {string} errorCode
   * @param {string} errorType
   * @param {boolean} errorFatal
   */
  async error(errorCode, errorType, errorFatal) {
    const collectors = this.collectors.concat(
      new ErrorCollector(errorCode, errorType, errorFatal)
    );
    const event = await this.prepareData(collectors);
    await this.transport.execute(event);
  }

  async prepareData(collectors) {
    let event = {};

    for (let i = 0; i < collectors.length; i += 1) {
      event = await collectors[i].prepare(event);

      if (!event) {
        throw new Error(`Invalid event returned by collector ${collectors[i].name}`);
      }
    }

    return event;
  }
}
