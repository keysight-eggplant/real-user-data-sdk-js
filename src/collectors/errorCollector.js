export function errorCollector(errorCode, errorType, errorFatal) {
  return async (event) => {
    event.errorCode = errorCode;
    event.errorType = errorType;
    event.errorFatal = errorFatal;

    return event;
  }
}