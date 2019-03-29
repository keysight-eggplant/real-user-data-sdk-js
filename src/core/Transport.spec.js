import {Transport} from './Transport';
import sinon from 'sinon';

describe('Transport Unit Tests', () => {
  let server;

  beforeEach(function() {
    server = sinon.createFakeServer();
  });

  afterEach(function() {
    server.restore();
  });

  it('should send given event as JSON body', function() {
    let event = {
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

    let dataJson = JSON.stringify(event);

    server.respondWith(
        "POST",
        "https://event.real-user-data.eggplant.io/test-tenancy-id-123/stream",
        [200, { "Content-Type": "application/json" },'']
    );

    let transport = new Transport('test-tenancy-id-123');

    transport.execute(event);

    server.respond();

    expect(server.requests[0].url).toEqual(
        "https://event.real-user-data.eggplant.io/test-tenancy-id-123/stream"
    );

    expect(server.requests[0].requestBody).toEqual(dataJson);

  });
});