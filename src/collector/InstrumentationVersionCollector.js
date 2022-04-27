import VERSION from '../core/version.constant.js';

export default class InstrumentationVersionCollector {

  constructor(instrumentationVersion) {
    this.instrumentationVersion = instrumentationVersion;
  }

  /**
     * This will collect the version from the RCISDK Core and then
     * append the instrumentation version on top
     * @param {Event} event
     * @returns {Promise<*>|Event}
     */
  async prepare (event) {

    try {
      event.softwareInfo5 = VERSION;
      if (typeof this.instrumentationVersion !== 'undefined') {
        if (
          typeof this.instrumentationVersion === 'string'
                    && /\b[0-9a-f]{5,40}\b/gi.test(this.instrumentationVersion)
        ) {
          /** This means it looks like an Git Hash so it will be truncated
                  *  to match the way the pipelines are truncating the git hashes */
          this.instrumentationVersion = this.instrumentationVersion.substring(0, 8);
        }

        event.softwareInfo5 = `${event.softwareInfo5}_${this.instrumentationVersion}`;
      }
    } catch (e) {
      /** An exception occurred. Do nothing and continue with the rest of the collectors */
    }
    return event;
  }
}
