import sinon from 'sinon';
import Transport from './Transport';

describe('Transport Unit Tests', () => {
  let server;

  beforeEach(() => {
    server = sinon.createFakeServer();
  });

  afterEach(() => {
    server.restore();
  });

  it('should send given event as JSON body', () => {

    const transport = new Transport('test-tenancy-id-123');
    const event = {
      id: 'abc-abc-123',
      clientId: 'def-def-123',
      eventType: 'event',
      eventAction: 'click',
      eventStart: 1000000,
      eventEnd: 1000001,
      eventSource: 'http://test.test/test',
      eventCategory: 'product',
      deviceType: 'test device',
    };

    const dataJson = JSON.stringify(event);

    server.respondWith(
      'POST',
      'https://event.real-user-data.eggplant.io/test-tenancy-id-123/stream',
      [200, { 'Content-Type': 'application/json' }, ''],
    );


    transport.execute(event);

    server.respond();

    expect(server.requests[0].url).toEqual(
      'https://event.real-user-data.eggplant.io/test-tenancy-id-123/stream',
    );

    expect(server.requests[0].requestBody).toEqual(dataJson);

  });
});
