/**
 * @typedef {Object} Config
 * @description Configuration object that composes the capability of the SDK
 * @property {Boolean} actions - If this is on true, action beacons will be sent to the cloud (address defined in transport). If on false, only on load events (representing states) will be sent.
 * @property {Boolean} actionsBatching - If this is on true, the actions beacons will be batched and sent alongside states. Otherwise will be sent as separate events.
 * @property {ListenerDefinition[]} events - The events that will trigger beacons
 * */

/**
 * @typedef {Object} ListenerDefinition
 * @property {String} selector - The selector on which the event will be listened for
 * @property {String} eventName - The name of the event
 * @property {String} eventCategory - The name of the event
 * @property {String} scope - Either "state", either "action". Useful to identify if the actions array should be pulled from local storage when batching is adctivated and needs to be sent with qa state.
 * */