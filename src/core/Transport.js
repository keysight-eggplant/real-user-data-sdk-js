export default class Transport {
  constructor(targetUrl) {
    this.targetUrl = targetUrl;
  }

  async execute(event) {

    await new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', this.targetUrl, true);
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
