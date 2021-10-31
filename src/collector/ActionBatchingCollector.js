
const localStorageActionsKey = 'eggplantRciActions';
export default class ActionBatchingCollector {

  constructor(localStorage) {
    this.localStorage = localStorage;
  }

  /**
       * @param  {Event} event
       * @param  {Context} context
       */
  async prepare (event, context) {
    /** Pull out the actions from local storage */
    const actions = this.localStorage.getItem(localStorageActionsKey);

    /** Append the new action */
    actions.push(event.eventInfo5[0]);
    if (context.scope === 'state') {

      /** Stringify actions and attached it to the state beacon */
      event.eventInfo5 = JSON.stringify(actions);

    } else if (context.scope === 'action') {
      this.localStorage.setItem(localStorageActionsKey, actions);
    }
    return event;
  }

}
