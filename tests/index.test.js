const generateId = require('../index');

describe('generateId', () => {
  test('should return a unique ID', () => {
    const testLength = 1000;
    const settings = {
      lang: 'en',
      adjective: true,
      color: true,
      noun: true,
      randomOrder: true,
      separator: '-',
      asObject: false,
      number: {
        min: 0,
        max: 9999,
        completeWithZeros: true
      }
    };

    const ids = new Set();

    // Generate testLength IDs
    for (let i = 0; i < testLength; i++) {
      const id = generateId(settings);

      console.log(`${i} ID: ${id}`);
      ids.add(id);
    }

    // Assert uniqueness
    expect(ids.size).toBe(testLength);
  });
});