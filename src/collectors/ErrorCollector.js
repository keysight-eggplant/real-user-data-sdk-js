export default class ErrorCollector {
  constructor(errorCode, errorType, errorFatal) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorFatal = errorFatal;
  }

  async prepare(event) {
    event.errorCode = this.errorCode;
    event.errorType = this.errorType;
    event.errorFatal = this.errorFatal;

    return event;
  }
}