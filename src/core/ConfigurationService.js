import actionCollectors from '../collector/actionCollectors';

export default class ConfigurationService {

    /**
     * 
     * @param {Collector[]} collectors 
     * @param {Object} config 
     */
  static prepareCollectors (collectors, config) {

    collectors = Array.isArray(collectors) ? [].concat(collectors) : [];

    if (config.actions === true) {
      collectors = collectors.concat(actionCollectors);
    }
  }
}
