import UAParser from 'ua-parser-js';
export default class UAParserController {

  constructor() {
    this.uaParser;
  }

  getParser () {
    this.uaParser = new UAParser();
    return this.uaParser;
  }

}