import ClientIdCollector from './ClientIdCollector';

describe('ClientIdCollector', () => {
  let localStorageMock;

  beforeEach(() => {
    localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn()
    };
  });

  test('new clientId is generated on first call', async () => {
    const clientIdCollector = new ClientIdCollector(localStorageMock);
    const event = {};

    const returnedEvent = await clientIdCollector.prepare(event);

    expect(localStorageMock.getItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);

    expect(localStorageMock.setItem.mock.calls[0][1])
      .toEqual(returnedEvent.clientId);

    expect(returnedEvent.clientId)
      .toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
  });

  test('repeated calls to collector return the same clientId', async () => {
    localStorageMock.getItem.mockReturnValue('abc-123-abc');

    const clientIdCollector = new ClientIdCollector(localStorageMock);
    const event = {};
    const returnedEvent = await clientIdCollector.prepare(event);

    expect(localStorageMock.getItem).toHaveBeenCalledTimes(1);
    expect(localStorageMock.setItem).not.toHaveBeenCalled();
    expect(returnedEvent.clientId).toBe('abc-123-abc');
  });
});
