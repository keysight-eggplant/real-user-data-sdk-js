/* eslint no-await-in-loop: 0 */
import ErrorCollector from '../collector/ErrorCollector';
import ActionCollectors from '../collector/actionCollectors';

export default class Producer {

  constructor(transport, collectors, config) {
    this.config = config;
    this.transport = transport;
    this.collectors = Array.isArray(collectors) ? [].concat(collectors) : [];

    console.log(this.config);
    if (this.config.actions === true) {
      this.collectors = this.collectors.concat(ActionCollectors);

      document.querySelector('*').addEventListener('mouseover', function() {
        console.log('mouseover triggered');
        this.collect();
      }, false);



    }
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
      event = await collectors[i].prepare(event, this.config);

      if (!event) {
        throw new Error(`Invalid event returned by collector ${collectors[i].name}`);
      }
    }

    return event;
  }
}
