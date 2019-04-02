export default class UriWithPageTitleCategoryCollector {

  async prepare (event) {
    event.eventSource = window.location.href;
    event.eventCategory = document.title;
    return event;
  }

}