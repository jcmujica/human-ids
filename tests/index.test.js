const generateId = require('../index');

describe('generateId', () => {
  test('should return a unique ID with all possible scenarios', () => {
    const allScenarios = [
      {
        lang: 'es',
        adjective: true,
        color: true,
        noun: true,
        randomOrder: false,
        separator: '-',
        asObject: false,
        number: {
          min: 0,
          max: 9999,
          sets: 1,
          completeWithZeros: true
        }
      },
      {
        lang: 'en',
        adjective: false,
        color: true,
        noun: true,
        randomOrder: true,
        separator: '_',
        asObject: true,
        number: {
          min: 1000,
          max: 9999,
          sets: 2,
          completeWithZeros: false
        }
      },
      // Add more scenarios here...
    ];

    const ids = new Set();

    for (const scenario of allScenarios) {
      const id = generateId(scenario);

      console.log(`Scenario: ${JSON.stringify(scenario, null, 2)}\nID: ${id}`);
      ids.add(id);
    }

    // Assert uniqueness for all scenarios
    expect(ids.size).toBe(allScenarios.length);
  });

  test('should return a unique ID with iterations', () => {
    const testLength = 1000;
    const settings = {
      lang: 'es',
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
