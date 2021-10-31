export default class CSSPathCollector {

  async prepare (event, config) {
    event.cssPath = 'hardcodedCSSPath';
    console.log(config);
    return event;
  }
}
  