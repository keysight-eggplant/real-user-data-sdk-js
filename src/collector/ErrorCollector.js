import {
  EVENT_TYPE
} from '../core/constants';

export default class ErrorCollector {
  static ERROR_CODES = {
    TRIGGER_CONDITION_FAILED: 'rci-sdk::e0',
    TRIGGER_ACTION_FAILED: 'rci-sdk::e1',
    TRIGGER_HANDLER_FAILED: 'rci-sdk::e2'
  }

  constructor(errorCode, errorType, errorFatal) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorFatal = errorFatal;
  }

  async prepare(event) {
    event.eventType = EVENT_TYPE.ERROR;
    event.errorCode = this.errorCode;
    event.errorType = this.errorType;
    event.errorFatal = this.errorFatal;

    return event;
  }
}
