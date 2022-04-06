import sinon from 'sinon';
import Transport from './Transport.js';

describe('Transport Unit Tests', () => {
  const tenancyId = '123-456';
  let server;

  beforeEach(() => {
    server = sinon.createFakeServer();
  });

  afterEach(() => {
    server.restore();
  });

  it('should send given event as JSON body', () => {
    const targetUrl = `https://target.domain/v1/${tenancyId}/stream`;
    const transport = new Transport(targetUrl);
    const event = {
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

    const dataJson = JSON.stringify(event);

    server.respondWith(
      'POST',
      `https://target.domain/v1/${tenancyId}/stream`,
      [200, { 'Content-Type': 'application/json' }, '']
    );

    transport.execute(event);

    server.respond();

    expect(server.requests[0].url).toEqual(
      `https://target.domain/v1/${tenancyId}/stream`
    );

    expect(server.requests[0].requestBody).toEqual(dataJson);

  });
});
