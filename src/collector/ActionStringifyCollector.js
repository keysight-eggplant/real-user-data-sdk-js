export default class ActionStringifyCollector {
  
  /**
         * @param  {Event} event
         */
  async prepare (event) {
      
    event.eventInfo5 = JSON.stringify(event.eventInfo5);
    return event;
  }
  
}