export default class InitializeActionCollector {


  /**
     * @param  {Event} event
     * @param  {Context} context
     */
  async prepare (event) {
    event.eventInfo5 = [{}];
    return event;
  }

}
