export default class XPathCollector {


  /**
   * @param  {Event} event
   * @param  {Context} context
   */
  async prepare (event, context) {
    console.log(context);
    if (context && context.elm && (context.elm instanceof Element || context.elm instanceof HTMLDocument)) {
      console.log(XPathCollector.createXPathFromElement(context.elm));
    }
    return event;
  }

  static createXPathFromElement (element) {
    const idx = (sib, name) => (sib
      ? idx(sib.previousElementSibling, name || sib.localName) + (sib.localName == name)
      : 1);
    const segs = elm => (!elm || elm.nodeType !== 1
      ? ['']
      : elm.id && document.getElementById(elm.id) === elm
        ? [`id("${elm.id}")`]
        : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm)}]`]);
    return segs(element).join('/');
  }
}
