/**
 * @typedef {Object} RCITarget
 * @property {String} targetedData - Tells where to search. See enum for possible values.
 * @property {String} searchMode - Tells how to search. See enum for possible values.
 * @property {String} searchValue - The value to search for.
 */

/**
 * @typedef {Object} RCITenancy
 * @property {String} name - The name of the tenancy. Unique.
 * @property {String} environment - The name of the environment. Ex: staging, pre-prod, prod.
 * @property {String} locale - The locale of the tenancy. Ex: en_AU.UTF-8
 * @property {String} tenancyId - The ID (UUID V4) of the tenancy.
 * @property {String=} url - The already composed URL of the tenancy. OPTIONAL.
 * If this is provided, the URL will no longer be composed from the other properties.
 * @property {RCITarget} target - The object that tells where to send the beacons.
*/

/**
 * @typedef {Object} RCISDKConfig
 * @property {Class<Array>} collectors
 * @property {RCITenancy<Array>} tenancies
 * @property {String=} targetUrl
 * */