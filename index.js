const dictionaries = require('./dictionaries');

class IdGenerator {
  constructor(settings = {}) {
    this.lang = dictionaries[settings.lang] ? settings.lang : dictionaries[settings.lang?.split('-')[0]] ? settings.lang?.split('-')[0] : 'en';
    this.useAdjective = settings.adjective || false;
    this.useColor = settings.color || false;
    this.useNoun = settings.noun || false;
    this.numberMin = settings.number && settings.number.min !== undefined ? settings.number.min : 0;
    this.numberMax = settings.number && settings.number.max !== undefined ? settings.number.max : 999;
    this.numberSets = settings.number && settings.number.sets || 1;
    this.completeWithZeros = settings.number && settings.number.completeWithZeros || false;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  formatNumber(number) {
    if (this.completeWithZeros) {
      const maxNumberLength = this.numberMax.toString().length;
      return number.toString().padStart(maxNumberLength, '0');
    } else {
      return number.toString();
    }
  }

  getAdjectives() {
    return dictionaries[this.lang].adjectives;
  }

  getColors() {
    return dictionaries[this.lang].colors;
  }

  getNouns() {
    return dictionaries[this.lang].nouns;
  }

  generateId() {
    const parts = [];

    if (this.useAdjective) {
      const adjectives = Object.values(this.getAdjectives());
      const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
      parts.push(adjective);
    }

    if (this.useColor) {
      const colors = Object.values(this.getColors());
      const color = colors[Math.floor(Math.random() * colors.length)];
      parts.push(color);
    }

    if (this.useNoun) {
      const nouns = Object.values(this.getNouns());
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      parts.push(noun);
    }

    for (let i = 0; i < this.numberSets; i++) {
      const number = this.getRandomNumber(this.numberMin, this.numberMax);
      const formattedNumber = this.formatNumber(number);
      parts.push(formattedNumber);
    }

    return parts.join('-');
  }
}

module.exports = IdGenerator;