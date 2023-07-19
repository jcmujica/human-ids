const dictionaries = require('./dictionaries');

const defaultSettings = {
  lang: 'en',
  adjective: true,
  color: true,
  noun: true,
  randomOrder: false,
  separator: '-',
  asObject: false,
  semantics: {
    es: ['noun', 'color', 'adjective', 'number'],
    en: ['adjective', 'color', 'noun', 'number'],
  },
  number: {
    min: 0,
    max: 999,
    sets: 1,
    completeWithZeros: false,
  },
};

function generateId(userSettings = {}) {
  const settings = { ...defaultSettings, ...userSettings };
  const lang = dictionaries[settings.lang]
    ? settings.lang
    : dictionaries[settings.lang?.split('-')[0]]
    ? settings.lang?.split('-')[0]
    : 'en';
  const useAdjective = settings.adjective || false;
  const useColor = settings.color || false;
  const useNoun = settings.noun || false;
  const numberMin =
    settings.number && settings.number.min !== undefined ? settings.number.min : 0;
  const numberMax =
    settings.number && settings.number.max !== undefined ? settings.number.max : 999;
  const numberSets = settings.number && settings.number.sets || 1;
  const completeWithZeros =
    settings.number && settings.number.completeWithZeros || false;

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function formatNumber(number) {
    if (completeWithZeros) {
      const maxNumberLength = numberMax.toString().length;
      return number.toString().padStart(maxNumberLength, '0');
    } else {
      return number.toString();
    }
  }

  function getAdjectives() {
    return settings.dictionary && settings.dictionary.adjectives
      ? settings.dictionary.adjectives
      : dictionaries[lang].adjectives;
  }

  function getColors() {
    return settings.dictionary && settings.dictionary.colors
      ? settings.dictionary.colors
      : dictionaries[lang].colors;
  }

  function getNouns() {
    return settings.dictionary && settings.dictionary.nouns
      ? settings.dictionary.nouns
      : dictionaries[lang].nouns;
  }

  const parts = {};

  if (useAdjective) {
    const adjectives = Object.values(getAdjectives());
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    parts.adjective = adjective;
  }

  if (useColor) {
    const colors = Object.values(getColors());
    const color = colors[Math.floor(Math.random() * colors.length)];
    parts.color = color;
  }

  if (useNoun) {
    const nouns = Object.values(getNouns());
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    parts.noun = noun;
  }

  for (let i = 0; i < numberSets; i++) {
    const number = getRandomNumber(numberMin, numberMax);
    const formattedNumber = formatNumber(number);
    parts[`number${i + 1}`] = formattedNumber;
  }

  if (settings.randomOrder) {
    const keys = Object.keys(parts);
    const shuffledKeys = keys.sort(() => Math.random() - 0.5);
    const shuffledParts = [];
    for (const key of shuffledKeys) {
      shuffledParts.push(parts[key]);
    }
    return shuffledParts.join(`${settings.separator}`);
  }

  if (settings.asObject) {
    return parts;
  }


  let semantics = settings.semantics && settings.semantics[lang] || settings.semantics.en;

  const result = semantics.map((key) => {
    if (key !== 'number') return parts[key];

    return Object.values(parts).filter((part) => !isNaN(part)).join('-');
  });
  return result.join(`${settings.separator}`);
}

module.exports = generateId;
