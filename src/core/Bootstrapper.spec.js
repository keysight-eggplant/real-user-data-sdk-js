'use strict';

import Sinon from 'sinon';
import Transport from './Transport.js';
import Producer from './Producer.js';
import Bootstrapper from './Bootstrapper.js';

describe('Bootstrapper', () => {

  describe('provisionTransport', () => {
    test('should choose the new way of provisioning when the config is valid for both cases', async () => {

      const TransportSpy = Sinon.spy(Transport);
      const ProducerSpy = Sinon.spy(Producer);

      const config = {
        targetUrl: 'https://www.google.com',
        tenancies: [
          {
            name: 'E2E Test'
          },
          {
            name: 'Beacon Generator 1'
          }
        ]
      };

      const bootstrapped = new Bootstrapper(config, TransportSpy, ProducerSpy);

      expect(TransportSpy.calledWithExactly(config.tenancies)).toEqual(true);
    });

    test('should choose the new way of provisioning when the config has only valid tenancies', async () => {

      const TransportSpy = Sinon.spy(Transport);
      const ProducerSpy = Sinon.spy(Producer);

      const config = {
        tenancies: [
          {
            name: 'E2E Test'
          },
          {
            name: 'Beacon Generator 1'
          }
        ]
      };

      const bootstrapped = new Bootstrapper(config, TransportSpy, ProducerSpy);

      expect(TransportSpy.calledWithExactly(config.tenancies)).toEqual(true);
    });

    test('should choose the legacy way of provisioning when the config has only a valid targetURL', async () => {

      const TransportSpy = Sinon.spy(Transport);
      const ProducerSpy = Sinon.spy(Producer);

      const config = {
        targetUrl: 'https://www.google.com'
      };

      const bootstrapped = new Bootstrapper(config, TransportSpy, ProducerSpy);

      expect(TransportSpy.calledWithExactly(config.targetUrl)).toEqual(true);
    });

  });

  describe('provisionProducer', () => {
    test('should provision the producer', async () => {

      const TransportSpy = Sinon.spy(Transport);
      const ProducerSpy = Sinon.spy(Producer);

      const config = {
        collectors: [
          {}, {}
        ],
        targetUrl: 'https://www.google.com'
      };
      // const TransportMock = Sinon.mock(Transport);
      const provisionedTransport = new Transport(config.targetUrl);
      const bootstrapped = new Bootstrapper(config, TransportSpy, ProducerSpy);

      expect(TransportSpy.calledWithExactly(config.targetUrl)).toEqual(true);
      expect(ProducerSpy.calledWithExactly(provisionedTransport, config.collectors)).toEqual(true);
    });
  });
});
