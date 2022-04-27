'use strict';

import chai from 'chai';
import chaiUuid from 'chai-uuid';
import puppeteer from 'puppeteer';
import TestSetupHelper from './testSetup.Helper.js';
import GenericTestHelper from './genericTest.Helper.js';

chai.use(chaiUuid);

const { expect } = chai;

/**
 * @typedef {Object} TestWebpackConfig
 * */

/**
 * @typedef {Object} TestServerConfig
 * @property {Number} port - The port that the server will be start on.
 * @property {Array} startedServers - Where the started servers are
 * stored in order to be closed gracefully.
 * @property {String} examplesPath - Where the examples are stored.
 * */

const defaultWaitForRequestsTimeout = 1000;
const defaultWaitForRequestsFrequency = 50;

describe('RCI SDK Core', () => {

  describe('Vanilla JS Tests', () => {
    let browser;

    before(async () => {
      await GenericTestHelper.startServer({
        port: 3000,
        startedServers: TestSetupHelper.startedServers
      });
      browser = await puppeteer.launch(TestSetupHelper.puppeteerLaunchConfig);
    });

    describe('Targeting latest browsers', () => {
      before(async () => {
        await GenericTestHelper.webpack(TestSetupHelper.coreWebpackCurrentConfig);
      });

      it('should work with the Onload example', async () => {

        const testSetup = {

          link: 'http://localhost:3000/examples/Vanilla/OnLoad/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/OnLoad/onload.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 1,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };

        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/123-456/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('OnLoad Example');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

      });

      it('should work with the Conversion example (Success: true)', async () => {

        const testSetup = {

          link: 'http://localhost:3000/examples/Vanilla/Conversion/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/Conversion/conversion.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 1,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };

        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await page.click('#checkout-form > button');
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/123-456/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('Checkout Completed');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

        expect(testSetup.capturedRequests[0].payload.goalType).to.deep.equal('checkout');
        expect(testSetup.capturedRequests[0].payload.goalValue).to.deep.equal(4900);
        expect(testSetup.capturedRequests[0].payload.goalCurrency).to.deep.equal('USD');

      });

      it('should work with the Conversion example (Success: false)', async () => {

        const testSetup = {

          link: 'http://localhost:3000/examples/Vanilla/Conversion/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/Conversion/conversion.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 1,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };

        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await page.click('#checkout-form-success');
        await page.click('#checkout-form > button');
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/123-456/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('Checkout Completed');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

      });

      it('should work with the Custom Collector example', async () => {

        const testSetup = {
          link: 'http://localhost:3000/examples/Vanilla/CustomCollector/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/CustomCollector/customCollector.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 1,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };

        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/123-456/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('Custom Collector Example');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

        // Custom collector data
        expect(testSetup.capturedRequests[0].payload.eventInfo1).to.deep.equal('FOO');
        expect(testSetup.capturedRequests[0].payload.eventInfo2).to.deep.equal('BAR');

      });

      it('should work with the Error example', async () => {

        const testSetup = {
          link: 'http://localhost:3000/examples/Vanilla/Error/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/Error/error.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 1,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };

        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/123-456/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('Error Example');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

        expect(testSetup.capturedRequests[0].payload.errorCode).to.deep.equal('TypeError');
        expect(testSetup.capturedRequests[0].payload.errorType).to.deep.equal('Oh no!  Something unexpected happened');
        expect(testSetup.capturedRequests[0].payload.errorFatal).to.deep.equal(true);

      });

      it('should work with the Instrumentation Version Collector example', async () => {
        const testSetup = {
          link: 'http://localhost:3000/examples/Vanilla/InstrumentationVersionCollector/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/InstrumentationVersionCollector/instrumentationVersionCollector.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 1,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };

        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/123-456/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('Instrumentation Version Collector Example');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

        // Version
        expect(testSetup.capturedRequests[0].payload.softwareInfo5).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo5.length).to.be.above(5);

      });

      it('should work with the Web Based Collectors example', async () => {
        const testSetup = {
          link: 'http://localhost:3000/examples/Vanilla/WebBasedCollectors/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/WebBasedCollectors/webBasedCollectors.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 1,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };
        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/123-456/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('Web-based Collectors Example');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

        // eventDurations
        expect(testSetup.capturedRequests[0].payload.eventDuration1).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration2).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration3).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration4).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration5).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration6).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration7).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration8).to.be.above(1);

      });

      it('should work with the Web Based Collectors Collection example', async () => {
        const testSetup = {
          link: 'http://localhost:3000/examples/Vanilla/WebBasedCollectorsCollection/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/WebBasedCollectorsCollection/webBasedCollectorsCollection.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 1,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };
        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/123-456/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('Web-based Collectors Collection Example');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

        // eventDurations
        expect(testSetup.capturedRequests[0].payload.eventDuration1).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration2).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration3).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration4).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration5).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration6).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration7).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration8).to.be.above(1);

        // Version
        expect(testSetup.capturedRequests[0].payload.softwareInfo5).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo5.length).to.be.above(5);

      });

      it('should work with the Various Collectors Example On Load example', async () => {
        const testSetup = {
          link: 'http://localhost:3000/examples/Vanilla/VariousCollectorsExampleOnLoad/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/VariousCollectorsExampleOnLoad/variousCollectorsExampleOnLoad.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 1,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };

        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/123-456/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('Various Collectors Example On Load');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

        // eventDurations
        expect(testSetup.capturedRequests[0].payload.eventDuration1).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration2).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration3).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration4).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration5).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration6).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration7).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration8).to.be.above(1);

        // Version
        expect(testSetup.capturedRequests[0].payload.softwareInfo5).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo5.length).to.be.above(5);

        // Custom collector Data
        expect(testSetup.capturedRequests[0].payload.eventInfo1).to.deep.equal('FOO');
        expect(testSetup.capturedRequests[0].payload.eventInfo2).to.deep.equal('BAR');
        expect(testSetup.capturedRequests[0].payload.eventInfo3).to.deep.equal('passed value in a custom collector');

      });

      it('should work with the Various Collectors Example On Load Bootstrapped example', async () => {
        const testSetup = {
          link: 'http://localhost:3000/examples/Vanilla/VariousCollectorsExampleOnLoadBootstrapped/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/VariousCollectorsExampleOnLoadBootstrapped/variousCollectorsExampleOnLoadBootstrapped.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 1,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };

        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/123-456/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('Various Collectors Example On Load Bootstrapped');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

        // eventDurations
        expect(testSetup.capturedRequests[0].payload.eventDuration1).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration2).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration3).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration4).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration5).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration6).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration7).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration8).to.be.above(1);

        // Version
        expect(testSetup.capturedRequests[0].payload.softwareInfo5).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo5.length).to.be.above(5);

        // Custom collector Data
        expect(testSetup.capturedRequests[0].payload.eventInfo1).to.deep.equal('FOO');
        expect(testSetup.capturedRequests[0].payload.eventInfo2).to.deep.equal('BAR');
        expect(testSetup.capturedRequests[0].payload.eventInfo3).to.deep.equal('passed value in a custom collector');

      });

      it('should work with the Various Collectors Example On Load Config based example', async () => {
        const testSetup = {
          link: 'http://localhost:3000/examples/Vanilla/VariousCollectorsExampleOnLoadConfigBased/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/VariousCollectorsExampleOnLoadConfigBased/variousCollectorsExampleOnLoadConfigBased.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 1,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };

        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/333-444/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('Various Collectors Example On Load Config Based');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

        // eventDurations
        expect(testSetup.capturedRequests[0].payload.eventDuration1).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration2).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration3).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration4).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration5).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration6).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration7).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration8).to.be.above(1);

        // Version
        expect(testSetup.capturedRequests[0].payload.softwareInfo5).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo5.length).to.be.above(5);

        // Custom collector Data
        expect(testSetup.capturedRequests[0].payload.eventInfo1).to.deep.equal('FOO');
        expect(testSetup.capturedRequests[0].payload.eventInfo2).to.deep.equal('BAR');
        expect(testSetup.capturedRequests[0].payload.eventInfo3).to.deep.equal('passed value in a custom collector');

      });

      it('should work with the Various Collectors Example On Load Config based Bootstrapped example', async () => {
        const testSetup = {
          link: 'http://localhost:3000/examples/Vanilla/VariousCollectorsExampleOnLoadConfigBasedBootstrapped/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/VariousCollectorsExampleOnLoadConfigBasedBootstrapped/variousCollectorsExampleOnLoadConfigBasedBootstrapped.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 1,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };

        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/333-444/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('Various Collectors Example On Load Config Based Bootstrapped');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

        // eventDurations
        expect(testSetup.capturedRequests[0].payload.eventDuration1).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration2).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration3).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration4).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration5).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration6).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration7).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration8).to.be.above(1);

        // Version
        expect(testSetup.capturedRequests[0].payload.softwareInfo5).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo5.length).to.be.above(5);

        // Custom collector Data
        expect(testSetup.capturedRequests[0].payload.eventInfo1).to.deep.equal('FOO');
        expect(testSetup.capturedRequests[0].payload.eventInfo2).to.deep.equal('BAR');
        expect(testSetup.capturedRequests[0].payload.eventInfo3).to.deep.equal('passed value in a custom collector');

      });

      it('should work with the Various Collectors Example On Load with multiple valid targets example', async () => {
        const testSetup = {
          link: 'http://localhost:3000/examples/Vanilla/VariousCollectorsExampleOnLoadMultipleValidTargets/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/VariousCollectorsExampleOnLoadMultipleValidTargets/variousCollectorsExampleOnLoadMultipleValidTargets.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 2,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };

        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/333-444/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('Various Collectors Example On Load Multiple Valid Targets');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

        // eventDurations
        expect(testSetup.capturedRequests[0].payload.eventDuration1).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration2).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration3).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration4).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration5).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration6).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration7).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration8).to.be.above(1);

        // Version
        expect(testSetup.capturedRequests[0].payload.softwareInfo5).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo5.length).to.be.above(5);

        // Custom collector Data
        expect(testSetup.capturedRequests[0].payload.eventInfo1).to.deep.equal('FOO');
        expect(testSetup.capturedRequests[0].payload.eventInfo2).to.deep.equal('BAR');
        expect(testSetup.capturedRequests[0].payload.eventInfo3).to.deep.equal('passed value in a custom collector');

        // Second request
        expect(testSetup.capturedRequests[1].requestUrl).to.deep.equal('http://localhost:3000/v1/777-888/stream');

        expect(testSetup.capturedRequests[1].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[1].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[1].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[1].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[1].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[1].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[1].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[1].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[1].payload.eventCategory).to.deep.equal('Various Collectors Example On Load Multiple Valid Targets');

        expect(testSetup.capturedRequests[1].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[1].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[1].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[1].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[1].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[1].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[1].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[1].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[1].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[1].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[1].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[1].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[1].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.softwareInfo4.length).to.be.above(30);

        // eventDurations
        expect(testSetup.capturedRequests[1].payload.eventDuration1).to.be.above(1);
        expect(testSetup.capturedRequests[1].payload.eventDuration2).to.be.above(1);
        expect(testSetup.capturedRequests[1].payload.eventDuration3).to.be.above(1);
        expect(testSetup.capturedRequests[1].payload.eventDuration4).to.be.above(1);
        expect(testSetup.capturedRequests[1].payload.eventDuration5).to.be.above(1);
        expect(testSetup.capturedRequests[1].payload.eventDuration6).to.be.above(1);
        expect(testSetup.capturedRequests[1].payload.eventDuration7).to.be.above(1);
        expect(testSetup.capturedRequests[1].payload.eventDuration8).to.be.above(1);

        // Version
        expect(testSetup.capturedRequests[1].payload.softwareInfo5).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.softwareInfo5.length).to.be.above(5);

        // Custom collector Data
        expect(testSetup.capturedRequests[1].payload.eventInfo1).to.deep.equal('FOO');
        expect(testSetup.capturedRequests[1].payload.eventInfo2).to.deep.equal('BAR');
        expect(testSetup.capturedRequests[1].payload.eventInfo3).to.deep.equal('passed value in a custom collector');

      });

      it('should work with the Various Collectors Example On Load with multiple valid targets bootstrapped example', async () => {
        const testSetup = {
          link: 'http://localhost:3000/examples/Vanilla/VariousCollectorsExampleOnLoadMultipleValidTargetsBootstrapped/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/VariousCollectorsExampleOnLoadMultipleValidTargetsBootstrapped/variousCollectorsExampleOnLoadMultipleValidTargetsBootstrapped.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 2,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };

        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/333-444/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('Various Collectors Example On Load Multiple Valid Targets Bootstrapped');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

        // eventDurations
        expect(testSetup.capturedRequests[0].payload.eventDuration1).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration2).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration3).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration4).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration5).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration6).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration7).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration8).to.be.above(1);

        // Version
        expect(testSetup.capturedRequests[0].payload.softwareInfo5).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo5.length).to.be.above(5);

        // Custom collector Data
        expect(testSetup.capturedRequests[0].payload.eventInfo1).to.deep.equal('FOO');
        expect(testSetup.capturedRequests[0].payload.eventInfo2).to.deep.equal('BAR');
        expect(testSetup.capturedRequests[0].payload.eventInfo3).to.deep.equal('passed value in a custom collector');

        // Second request
        expect(testSetup.capturedRequests[1].requestUrl).to.deep.equal('http://localhost:3000/v1/777-888/stream');

        expect(testSetup.capturedRequests[1].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[1].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[1].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[1].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[1].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[1].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[1].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[1].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[1].payload.eventCategory).to.deep.equal('Various Collectors Example On Load Multiple Valid Targets Bootstrapped');

        expect(testSetup.capturedRequests[1].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[1].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[1].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[1].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[1].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[1].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[1].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[1].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[1].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[1].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[1].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[1].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[1].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.softwareInfo4.length).to.be.above(30);

        // eventDurations
        expect(testSetup.capturedRequests[1].payload.eventDuration1).to.be.above(1);
        expect(testSetup.capturedRequests[1].payload.eventDuration2).to.be.above(1);
        expect(testSetup.capturedRequests[1].payload.eventDuration3).to.be.above(1);
        expect(testSetup.capturedRequests[1].payload.eventDuration4).to.be.above(1);
        expect(testSetup.capturedRequests[1].payload.eventDuration5).to.be.above(1);
        expect(testSetup.capturedRequests[1].payload.eventDuration6).to.be.above(1);
        expect(testSetup.capturedRequests[1].payload.eventDuration7).to.be.above(1);
        expect(testSetup.capturedRequests[1].payload.eventDuration8).to.be.above(1);

        // Version
        expect(testSetup.capturedRequests[1].payload.softwareInfo5).to.be.a('string');
        expect(testSetup.capturedRequests[1].payload.softwareInfo5.length).to.be.above(5);

        // Custom collector Data
        expect(testSetup.capturedRequests[1].payload.eventInfo1).to.deep.equal('FOO');
        expect(testSetup.capturedRequests[1].payload.eventInfo2).to.deep.equal('BAR');
        expect(testSetup.capturedRequests[1].payload.eventInfo3).to.deep.equal('passed value in a custom collector');

      });

      it('should work with the Various Collectors Example On Load Targeting Canonical Links example', async () => {
        const testSetup = {
          link: 'http://localhost:3000/examples/Vanilla/VariousCollectorsExampleOnLoadTargetingCanonicalLinks/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/VariousCollectorsExampleOnLoadTargetingCanonicalLinks/variousCollectorsExampleOnLoadTargetingCanonicalLinks.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 1,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };

        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
        expect(testSetup.capturedRequests[0].requestUrl).to.deep.equal('http://localhost:3000/v1/333-444/stream');

        expect(testSetup.capturedRequests[0].payload.id).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.clientId).to.to.be.a.uuid('v4');
        expect(testSetup.capturedRequests[0].payload.deviceType).to.be.oneOf(TestSetupHelper.ranges.deviceTypes);
        expect(testSetup.capturedRequests[0].payload.eventAction).to.be.oneOf(TestSetupHelper.ranges.eventActions);
        expect(testSetup.capturedRequests[0].payload.eventType).to.be.oneOf(TestSetupHelper.ranges.eventTypes);
        expect(testSetup.capturedRequests[0].payload.eventStart).to.be.above(1649372134762);
        expect(testSetup.capturedRequests[0].payload.eventEnd).to.be.above(testSetup.capturedRequests[0].payload.eventStart);
        expect(testSetup.capturedRequests[0].payload.eventSource).to.deep.equal(testSetup.link);
        expect(testSetup.capturedRequests[0].payload.eventCategory).to.deep.equal('Various Collectors Example On Load Targeting Canonical Links');

        expect(testSetup.capturedRequests[0].payload.viewportHeight).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.viewportWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenColors).to.be.above(8);

        expect(testSetup.capturedRequests[0].payload.osName).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osName.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.osVersion).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.osVersion.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.encoding).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.encoding.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.language).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.language.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo1).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo1.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo2).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo2.length).to.be.above(0);
        expect(testSetup.capturedRequests[0].payload.softwareInfo3).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo3.length).to.be.above(0);

        expect(testSetup.capturedRequests[0].payload.screenResolutionWidth).to.be.above(200);
        expect(testSetup.capturedRequests[0].payload.screenResolutionHeight).to.be.above(200);

        expect(testSetup.capturedRequests[0].payload.softwareInfo4).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo4.length).to.be.above(30);

        // eventDurations
        expect(testSetup.capturedRequests[0].payload.eventDuration1).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration2).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration3).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration4).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration5).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration6).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration7).to.be.above(1);
        expect(testSetup.capturedRequests[0].payload.eventDuration8).to.be.above(1);

        // Version
        expect(testSetup.capturedRequests[0].payload.softwareInfo5).to.be.a('string');
        expect(testSetup.capturedRequests[0].payload.softwareInfo5.length).to.be.above(5);

        // Custom collector Data
        expect(testSetup.capturedRequests[0].payload.eventInfo1).to.deep.equal('FOO');
        expect(testSetup.capturedRequests[0].payload.eventInfo2).to.deep.equal('BAR');
        expect(testSetup.capturedRequests[0].payload.eventInfo3).to.deep.equal('passed value in a custom collector');

      });

      it('should work with the Various Collectors Example On Load Targeting Canonical Links that are missing example', async () => {
        const testSetup = {
          link: 'http://localhost:3000/examples/Vanilla/VariousCollectorsExampleOnLoadNonMatchingTargetingCanonicalLinks/index.html',
          instrumentationWebpackConfig: {
            entryPoint: './examples/Vanilla/VariousCollectorsExampleOnLoadNonMatchingTargetingCanonicalLinks/variousCollectorsExampleOnLoadNonMatchingTargetingCanonicalLinks.js',
            scope: 'implementation',
            rulesTarget: 'current',
            mode: 'development'
          },
          expectedRequests: 0,
          waitForRequestsTimeout: defaultWaitForRequestsTimeout,
          waitForRequestsFrequency: defaultWaitForRequestsFrequency,
          requestsGLOBPattern: '*',
          capturedRequests: []
        };

        await GenericTestHelper.webpack(testSetup.instrumentationWebpackConfig);

        const page = await browser.newPage();
        await TestSetupHelper.startListeningForRequests(testSetup, page);
        await page.goto(testSetup.link);
        await TestSetupHelper.stopListeningForRequests(testSetup);
        await page.close();

        expect(testSetup.capturedRequests.length).to.deep.equal(testSetup.expectedRequests);
      });
    });

    after(async () => {
      await GenericTestHelper.stopServers(TestSetupHelper.startedServers);
      await browser.close();
    });
  });
});
