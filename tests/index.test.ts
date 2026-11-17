import { generateId, cryptoRandom, dictionaries } from '../src';

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

// Small seeded PRNG so a sequence of draws can be replayed exactly.
function seeded(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

describe('random source', () => {
  test('uses the provided source for every component', () => {
    const lowest = generateId({ asObject: true, random: () => 0 });
    expect(lowest).toEqual({
      adjective: dictionaries.en.adjectives[0],
      color: dictionaries.en.colors[0],
      noun: dictionaries.en.nouns[0],
      number1: '0',
    });

    const highest = generateId({ asObject: true, random: () => 0.9999999 });
    expect(highest).toEqual({
      adjective: dictionaries.en.adjectives[dictionaries.en.adjectives.length - 1],
      color: dictionaries.en.colors[dictionaries.en.colors.length - 1],
      noun: dictionaries.en.nouns[dictionaries.en.nouns.length - 1],
      number1: '9999',
    });
  });

  test('a seeded source makes IDs reproducible, including random order', () => {
    const settings = { lang: 'es', randomOrder: true, number: { sets: 2 } };
    const first = [1, 2, 3].map(() => generateId({ ...settings, random: seeded(42) }));
    const again = [1, 2, 3].map(() => generateId({ ...settings, random: seeded(42) }));
    expect(again).toEqual(first);
    expect(generateId({ ...settings, random: seeded(7) })).not.toEqual(first[0]);
  });

  test('cryptoRandom stays within [0, 1)', () => {
    for (let i = 0; i < 2000; i++) {
      const value = cryptoRandom();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });

  test('cryptoRandom produces well-formed IDs', () => {
    const id = generateId({ random: cryptoRandom });
    expect(id).toMatch(/^[^-]+-[^-]+-[^-]+-\d+$/);
  });

  test('defaults to Math.random when no source is given', () => {
    const spy = jest.spyOn(Math, 'random');
    generateId();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
