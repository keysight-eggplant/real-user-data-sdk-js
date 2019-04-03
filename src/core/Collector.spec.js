'use strict';

import Sinon from 'sinon';
import Collector from './Collector';
import Transport from './Transport';

describe('Collector', () => {

  describe('collect', () => {
    let collectors;
    beforeEach(() => {
      collectors = [
        {prepare: Sinon.stub()},
        {prepare: Sinon.stub()}
      ];
    });
    test('should collect several event augmentation', async () => {

      collectors[0].prepare.returns({num: 1});
      collectors[1].prepare.returns({num: 2});

      const TransportMock = Sinon.mock(Transport);
      TransportMock.execute = Sinon.spy();

      const collector = new Collector(TransportMock, collectors);

      await collector.collect();

      expect(collectors[0].prepare.calledWithExactly({})).toEqual(true);
      expect(collectors[1].prepare.calledWithExactly({num: 1})).toEqual(true);
      expect(TransportMock.execute.calledWithExactly({num: 2})).toEqual(true);
    });

    test('should throw when an event is returned as undefined', async () => {

      collectors[0].prepare.returns({num: 1});
      collectors[1].prepare.returns(undefined);

      const TransportMock = Sinon.mock(Transport);
      TransportMock.execute = Sinon.spy();

      const collector = new Collector(TransportMock, collectors);

      expect(collector.collect()).rejects.toThrow(new Error('Invalid event returned by collector undefined'));
    });
  });
});
