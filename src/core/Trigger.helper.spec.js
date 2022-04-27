import Sinon from 'sinon';
import TriggerHelper from './Trigger.helper.js';
import Producer from './Producer.js';

describe('TriggerHelper Unit Tests', () => {

  it('should trigger the action within the expected time frame', async () => {

    const ProducerMock = Sinon.mock(Producer);
    ProducerMock.collect = Sinon.spy();

    const condition = Sinon.stub().onCall(0).returns(false).onCall(1)
      .returns(false)
      .onCall(2)
      .returns(true);

    const options = {
      producer: ProducerMock,
      action: TriggerHelper.action,
      condition,
      interval: 10,
      timeout: 1000
    };

    await TriggerHelper.waitAndTrigger(options);

    Sinon.assert.calledThrice(condition);
    Sinon.assert.calledOnce(ProducerMock.collect);
  });

  it('should trigger the action on timeout rather than condition being true', async () => {

    const ProducerMock = Sinon.mock(Producer);
    ProducerMock.collect = Sinon.spy();

    const action = Sinon.spy();

    const condition = Sinon.stub().returns(false);

    const options = {
      producer: ProducerMock,
      action,
      condition,
      interval: 10,
      timeout: 30
    };

    await TriggerHelper.waitAndTrigger(options);

    Sinon.assert.calledThrice(condition);
    Sinon.assert.calledOnce(action);

  });
});
