export default class Transport {
  /**
   * @param {String|RCITenancy<Array>} targetUrl
   */
  constructor(input) {
    this.targetUrls = [];
    if (typeof input === 'string' || input instanceof String) {
      this.targetUrls.push(input);
    } else if (Array.isArray(input) && input.length > 0) {
      this.targetUrls = input;
    }
  }

  static composeURL () {

  }

  static filterTenancies (tenancies) {

  }

  async execute(event) {

    if (this.targetUrls.length === 0) {
      console.log('No target URLs provided');
    } else {
      await new Promise((resolve) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', this.targetUrls[0], true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = () => {
          console.log('Unable to send event!');
        };
        xhr.send(JSON.stringify(event));
      });
    }
  }
}
