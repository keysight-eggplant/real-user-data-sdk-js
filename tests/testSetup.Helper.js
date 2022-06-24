/* eslint-disable no-prototype-builtins */
/* eslint-disable no-async-promise-executor */
import { intercept, patterns } from 'puppeteer-interceptor';
import GenericTestHelper from './genericTest.Helper.js';

/**
 * @typedef {Object} setupVanillaTestResult
 * @property {Object} page - The page that was bootstrapped and on which the interception was set
 * @property {Object<Array>} requests - The requests that were intercepted
 * according to the GLOB pattern and method
 * */

class TestSetupHelper {

  static startedServers = [];

  static ranges = {
    deviceTypes: ['PC', 'console', 'tablet', 'smarttv', 'mobile', 'wearable', 'embedded'],
    eventActions: ['state-load-full', 'state-load-partial'],
    eventTypes: ['state', 'error']
  };

  static coreWebpackBaseConfig = {
    entryPoint: './src/rci.js',
    scope: 'core',
    mode: 'development'
  };

  static coreWebpackCurrentConfig = {
    ...TestSetupHelper.coreWebpackBaseConfig,
    rulesTarget: 'current'
  };

  static coreWebpackLegacyConfig = {
    ...TestSetupHelper.coreWebpackBaseConfig,
    rulesTarget: 'legacy',
    includeRulesTargetSuffix: false
  };

  static puppeteerLaunchConfig = {
    headless: true
  };

  static async startListeningForRequests (testSetup, page) {
    intercept(page, patterns.XHR(testSetup.requestsGLOBPattern), {
      onInterception: (event) => {
        if ((testSetup.hasOwnProperty('requestsAcceptedMethods') && testSetup.requestsAcceptedMethods.includes(event.request.method)) || !testSetup.hasOwnProperty('requestsAcceptedMethods')) {
          const request = {
            requestUrl: event.request.url,
            method: event.request.method
          };

          if (event.request.hasOwnProperty('postData')) {
            request.payload = JSON.parse(event.request.postData);
          }

          testSetup.capturedRequests.push(request);

        } else {
          console.log(`Request: ${event.request.url} has a forbidden method (${event.request.method}) Accepted methods: ${testSetup.requestsAcceptedMethods}`);
        }
      }
    });
  }

  static async stopListeningForRequests (testSetup) {
    return new Promise(async (resolve, reject) => {

      try {
        await GenericTestHelper.waitUntil(
          () => testSetup.capturedRequests.length >= testSetup.expectedRequests,
          testSetup.waitForRequestsTimeout,
          testSetup.waitForRequestsFrequency

        );
        resolve(testSetup.capturedRequests);
      } catch (e) {
        console.log('Not enough beacons captured');
        console.log(testSetup.capturedRequests);
        reject();
      }
    });
  }
}

export default TestSetupHelper;
