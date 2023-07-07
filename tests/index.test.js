const IdGenerator = require('../index');

describe('IdGenerator', () => {
  test('generateId should return a unique ID', () => {
    const testLength = 1000000;
    const settings = {
      lang: 'en',
      adjective: true,
      color: true,
      noun: true,
      number: {
        min: 0,
        max: 9999,
        completeWithZeros: true
      }
    };

    const idGenerator = new IdGenerator(settings);
    const ids = new Set();

    // Generate 1000 IDs
    for (let i = 0; i < testLength; i++) {
      const id = idGenerator.generateId();
      ids.add(id);
    }

    // Assert uniqueness
    expect(ids.size).toBe(testLength);
  });
});