import ConversionCollector from './ConversionCollector.js';

describe('ConversionCollector', () => {
  let conversionCollector;
  let originalEvent;
  let expectedEventWithoutValue;
  let expectedEventWithValue;

  beforeEach(() => {
    originalEvent = {
      clientId: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc001',
      goalType: 'state',
      eventAction: 'load',
      eventSource: 'products/shoes/1',
      eventCategory: 'products/shoes',
      deviceType: 'mobile'
    };
    expectedEventWithoutValue = {
      ...originalEvent,
      goalType: 'newsletter',
      goalCurrency: null,
      goalValue: null
    };
    expectedEventWithValue = {
      ...originalEvent,
      goalType: 'success',
      goalCurrency: 'USD',
      goalValue: 4900
    };

    conversionCollector = new ConversionCollector();
  });

  test('Return event without additional fields', async () => {
    const actualEvent = await conversionCollector.prepare(originalEvent);
    expect(actualEvent).toEqual(originalEvent);
  });

  test('Return event with conversion type and no value', async () => {
    conversionCollector.success('newsletter', null, null);
    const actualEvent = await conversionCollector.prepare(originalEvent);

    expect(actualEvent).toEqual(expectedEventWithoutValue);
    expect(actualEvent.goalType).toEqual(expectedEventWithoutValue.goalType);
    expect(actualEvent.goalCurrency).toEqual(expectedEventWithoutValue.goalCurrency);
    expect(actualEvent.goalValue).toEqual(expectedEventWithoutValue.goalValue);
  });

  test('Return event with conversion type and value', async () => {
    conversionCollector.success('success', 4900, 'USD');
    const actualEvent = await conversionCollector.prepare(originalEvent);

    expect(actualEvent).toEqual(expectedEventWithValue);
    expect(actualEvent.goalType).toEqual(expectedEventWithValue.goalType);
    expect(actualEvent.goalCurrency).toEqual(expectedEventWithValue.goalCurrency);
    expect(actualEvent.goalValue).toEqual(expectedEventWithValue.goalValue);
  });

  test('Return event without conversion type and value when cleared', async () => {
    conversionCollector.success('success', 4900, 'USD').clear();
    const actualEvent = await conversionCollector.prepare(originalEvent);

    expect(actualEvent).toEqual(originalEvent);
  });

});
