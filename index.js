const dictionaries = require('./dictionaries');

function generateId(settings = {}) {
  const lang = dictionaries[settings.lang] ? settings.lang : dictionaries[settings.lang?.split('-')[0]] ? settings.lang?.split('-')[0] : 'en';
  const useAdjective = settings.adjective || false;
  const useColor = settings.color || false;
  const useNoun = settings.noun || false;
  const numberMin = settings.number && settings.number.min !== undefined ? settings.number.min : 0;
  const numberMax = settings.number && settings.number.max !== undefined ? settings.number.max : 999;
  const numberSets = settings.number && settings.number.sets || 1;
  const completeWithZeros = settings.number && settings.number.completeWithZeros || false;

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
    return dictionaries[lang].adjectives;
  }

  function getColors() {
    return dictionaries[lang].colors;
  }

  function getNouns() {
    return dictionaries[lang].nouns;
  }

  const parts = [];

  if (useAdjective) {
    const adjectives = Object.values(getAdjectives());
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    parts.push(adjective);
  }

  if (useColor) {
    const colors = Object.values(getColors());
    const color = colors[Math.floor(Math.random() * colors.length)];
    parts.push(color);
  }

  if (useNoun) {
    const nouns = Object.values(getNouns());
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    parts.push(noun);
  }

  for (let i = 0; i < numberSets; i++) {
    const number = getRandomNumber(numberMin, numberMax);
    const formattedNumber = formatNumber(number);
    parts.push(formattedNumber);
  }

  return parts.join('-');
}

module.exports = generateId;