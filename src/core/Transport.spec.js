'use strict';

const chai = require('chai');

const Transport = require('./Transport');

chai.should();

describe('Transport Unit Tests', function () {
  beforeEach(function() {
    this.xhr = sinon.useFakeXMLHttpRequest();

    this.requests = [];
    this.xhr.onCreate = function(xhr) {
      this.requests.push(xhr);
    }.bind(this);
  });

  afterEach(function() {
    this.xhr.restore();
  });

  it('should send given event as JSON body', async function() {
    var event = {
      id: 'abc-abc-123',
      clientId: 'def-def-123',
      eventType: 'event',
      eventAction: 'click',
      eventStart: 1000000,
      eventEnd: 1000001,
      eventSource: 'http://test.test/test',
      eventCategory: 'product',
      deviceType: 'test device'
    };

    var dataJson = JSON.stringify(event);

    let transport = new Transport('test-tenancy-id-123');

    await transport.execute(event);

    this.requests[0].url.should.equal(
        'https://event.real-user-data.eggplant.io/test-tenancy-id-123/stream'
    );

    this.requests[0].requestBody.should.equal(dataJson);
  });
});