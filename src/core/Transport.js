export class Transport {
  constructor(tenancyId) {
    this.targetUrl = `https://event.real-user-data.eggplant.io/${tenancyId}/stream`;
  }

  async execute(event) {
    // TODO: Send XHR

    console.log(event);
  }
}