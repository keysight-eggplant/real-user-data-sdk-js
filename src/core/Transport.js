export default class Transport {
  constructor(tenancyId) {
    this.targetUrl = `https://event.real-user-data.eggplant.io/${tenancyId}/stream`;
  }

  async execute(event) {

    await new Promise(resolve => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', this.targetUrl, true);
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
