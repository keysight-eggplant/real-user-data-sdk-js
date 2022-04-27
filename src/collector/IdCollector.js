import uuid from '../core/utility/uuid.js';

export default class IdCollector {

  async prepare (event) {
    event.id = uuid();
    return event;
  }

}
