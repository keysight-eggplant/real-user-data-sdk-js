import uuid from '../core/utility/uuid.js';

const localStorageClientIdKey = 'eggplantRciClientId';

export default class ClientIdCollector {

  constructor(localStorage) {
    this.localStorage = localStorage;
  }

  async prepare(event) {
    let clientId = this.localStorage.getItem(localStorageClientIdKey);
    if (!clientId) {
      clientId = uuid();
      this.localStorage.setItem(localStorageClientIdKey, clientId);
    }

    event.clientId = clientId;

    return event;
  }
}
