import actionCollectors from '../collector/actionCollectors';
import InitializeActionCollector from '../collector/InitializeActionCollector';
import ActionBatchingCollector from '../collector/ActionBatchingCollector';
import ActionStringifyCollector from '../collector/ActionStringifyCollector';

export default class ConfigurationService {

    /**
     * 
     * @param {Collector[]} collectors 
     * @param {Config} config 
     */
  static prepareCollectors (collectors, config) {

    collectors = Array.isArray(collectors) ? [].concat(collectors) : [];

    if (config.actions === true) {
        /**
         * Make sure that the following collectors are kept in this order to avoid weird behaviours
         */
        
        collectors.push(new InitializeActionCollector());
        
        collectors = collectors.concat(actionCollectors);

        if (config.actionsBatching === true) {
            collectors.push(new ActionBatchingCollector());
        } else {
            collectors.push(new ActionStringifyCollector());
        }
        
      }

    return collectors;
  }
}
