export default class UriWithPathCategoryCollector {

  async prepare (event) {
    event.eventSource = window.location.href;
    event.eventCategory = window.location.pathname;
    return event;
  }

}