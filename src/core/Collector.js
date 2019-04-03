/* eslint no-await-in-loop: 0 */
export default class Collector {
  constructor(transport, collectors) {
    this.transport = transport;
    this.collectors = Array.isArray(collectors) ? [].concat(collectors) : [];
  }

  async collect() {
    let event = {};

    for (let i = 0; i < this.collectors.length; i += 1) {
      event = await this.collectors[i].prepare(event);

      if (!event) {
        throw new Error(`Invalid event returned by collector ${this.collectors[i].name}`);
      }
    }

    await this.transport.execute(event);
  }
}
