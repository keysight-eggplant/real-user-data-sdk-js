/**
 * @typedef {Object} Context
 * @property {String} eventName
 * @property {String} scope - Either "state", either "action". Useful to identify if the actions array should be pulled from local storage when batching is adctivated and needs to be sent with qa state.
 * @property {HTMLElement} elm - The DOM element or HTML element (no matter from the context is coming from)
 * */
