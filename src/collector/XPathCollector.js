export default class XPathCollector {

  async prepare (event, config) {
    event.xPath = 'hardcodedXPath';
    console.log(config);
    return event;
  }
}
