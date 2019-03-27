export class Transport {
  constructor(tenancyId) {
    this.targetUrl = `https://event.real-user-data.eggplant.io/${tenancyId}/stream`;
  }

  async execute(event) {

    await new Promise(resolve => {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', this.targetUrl, true);
      xhr.onload = function(e) {
        resolve(xhr.response);
      };
      xhr.send(JSON.stringify(event));
    });

    console.log(event);
  }
}