import Sinon from 'sinon';
import TriggerHelper from './Trigger.helper';
import Producer from './Producer';

describe('TriggerHelper Unit Tests', () => {

  it('should trigger the action within the expected timeframe', async () => {

    const ProducerMock = Sinon.mock(Producer);
    ProducerMock.collect = Sinon.spy();

    const delayedCondition = async function () {
      const x = Math.floor(Math.random() * 6) + 1;
      return x === 6;
    };

    const options = {
      producer: ProducerMock,
      action: TriggerHelper.action,
      condition: delayedCondition,
      interval: 10,
      timeout: 1000
    };

    await TriggerHelper.waitAndTrigger(options);

    Sinon.assert.calledOnce(ProducerMock.collect);
  });
});
