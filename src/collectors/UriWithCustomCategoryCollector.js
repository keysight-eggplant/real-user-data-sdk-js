export default class UriWithCustomCategoryCollector {

  constructor(eventCategory) {
    this.eventCategory = eventCategory;
  }

  async prepare (event) {
    event.eventSource = window.location.href;
    event.eventCategory = this.eventCategory;
    return event;
  }

}