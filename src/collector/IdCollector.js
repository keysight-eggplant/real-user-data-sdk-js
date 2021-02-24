import uuid from '../core/utility/uuid';

export default class IdCollector {

  async prepare (event) {
    event.id = uuid();
    return event;
  }

}
