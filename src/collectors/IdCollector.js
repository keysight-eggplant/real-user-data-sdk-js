import uuid from './utility/uuid.js';

export default class IdCollector {

  async prepare (event) {
    event.id = uuid();
    return event;
  }

}