/* eslint-disable no-plusplus */
/* eslint no-await-in-loop: 0 */

export default class Bootstrapper {

  /**
     *
     * @param {RCISDKConfig} config
     */
  constructor (config, transport, producer) {
    this.config = config;
    this.transport = this.provisionTransport(transport);
    this.producer = this.provisionProducer(producer);
  }

  provisionTransport (Transport) {
    let input;
    if ((Array.isArray(this.config.tenancies) && this.config.tenancies.length > 0) && ((typeof this.config.targetUrl === 'string' || this.config.targetUrl instanceof String) && this.config.targetUrl.length > 0)) {
      // If tenancies is an populated array and targetUrl is a populated string, then choose to provision the transport in the new way
      input = this.config.tenancies;
    } else if (Array.isArray(this.config.tenancies) && this.config.tenancies.length > 0) {
      // If tenancies is an populated array and targetUrl is invalid, provision the transport in the new way
      input = this.config.tenancies;
    } else if (((typeof this.config.targetUrl === 'string' || this.config.targetUrl instanceof String) && this.config.targetUrl.length > 0)) {
      // If tenancies array is invalid and targetUrl is a populated string, then choose to provision the transport in the legacy way
      input = this.config.targetUrl;
    } else {
      console.log('Transport couldn\'t be provisioned');
    }

    return new Transport(input);
  }

  provisionProducer (Producer) {
    return new Producer(this.transport, this.config.collectors);
  }
}
