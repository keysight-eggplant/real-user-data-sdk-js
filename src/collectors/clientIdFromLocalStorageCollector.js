import uuid from './utility/uuid.js';

export function clientIdFromLocalStorageCollector(key) {
  return async (event) => {
    let clientId = localStorage.getItem(key);

    if(!clientId) {
      clientId = uuid();
      localStorage.setItem(key, clientId);
    }

    event.clientId = clientId;

    return event;
  };
};