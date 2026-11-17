/**
 * Human IDs - A library to generate human-readable identifiers
 * @packageDocumentation
 * @module human-ids
 */

import { dictionaries } from './dictionaries';

/**
 * Dictionary containing word lists for ID generation.
 * Each property maps word keys to their display values.
 *
 * @example
 * ```typescript
 * const customDictionary: Dictionary = {
 *   adjectives: { happy: 'happy', bright: 'bright' },
 *   colors: { red: 'red', blue: 'blue' },
 *   nouns: { cat: 'cat', dog: 'dog' }
 * };
 * ```
 */
export interface Dictionary {
  /** List of adjective words */
  adjectives: string[];
  /** List of color words */
  colors: string[];
  /** List of noun words */
  nouns: string[];
}

/**
 * Object containing the individual parts of a generated ID.
 * Returned when `asObject: true` is set in the settings.
 *
 * @example
 * ```typescript
 * const parts: IdParts = {
 *   adjective: 'happy',
 *   color: 'blue',
 *   noun: 'cat',
 *   number1: '1234'
 * };
 * ```
 */
export interface IdParts {
  /** The adjective component (if enabled) */
  adjective?: string;
  /** The color component (if enabled) */
  color?: string;
  /** The noun component (if enabled) */
  noun?: string;
  /** Additional properties for number components (number1, number2, etc.) */
  [key: string]: string | undefined;
}

/**
 * Configuration options for the number component(s) of generated IDs.
 *
 * @example
 * ```typescript
 * // Generate IDs with numbers between 1000-9999, zero-padded
 * const numberSettings: NumberSettings = {
 *   min: 1000,
 *   max: 9999,
 *   sets: 1,
 *   completeWithZeros: true
 * };
 * ```
 */
export interface NumberSettings {
  /**
   * Minimum value for random numbers (inclusive)
   * @default 0
   */
  min?: number;
  /**
   * Maximum value for random numbers (inclusive)
   * @default 9999
   */
  max?: number;
  /**
   * Number of separate number components to include
   * @default 1
   * @example
   * // With sets: 2, generates: "happy-blue-cat-1234-5678"
   */
  sets?: number;
  /**
   * Whether to pad numbers with leading zeros to match max length
   * @default false
   * @example
   * // With max: 9999 and completeWithZeros: true
   * // Number 42 becomes "0042"
   */
  completeWithZeros?: boolean;
}

/**
 * Maps language codes to their component ordering.
 * Defines the order in which ID parts appear for each language.
 *
 * @example
 * ```typescript
 * const semantics: SemanticsMap = {
 *   en: ['adjective', 'color', 'noun', 'number'], // happy-blue-cat-123
 *   es: ['noun', 'color', 'adjective', 'number']  // gato-azul-feliz-123
 * };
 * ```
 */
export interface SemanticsMap {
  [lang: string]: Array<'noun' | 'adjective' | 'color' | 'number'>;
}

/**
 * Configuration options for the ID generator.
 *
 * @example
 * ```typescript
 * // Basic usage with Spanish
 * const settings: IdGeneratorSettings = {
 *   lang: 'es',
 *   separator: '_'
 * };
 *
 * // Advanced usage with custom dictionary
 * const advancedSettings: IdGeneratorSettings = {
 *   lang: 'en',
 *   adjective: true,
 *   color: false,  // Exclude colors
 *   noun: true,
 *   number: { min: 100, max: 999 },
 *   dictionary: {
 *     adjectives: { cool: 'cool', awesome: 'awesome' }
 *   }
 * };
 * ```
 */
export interface IdGeneratorSettings {
  /**
   * Language code for built-in dictionaries ('en' or 'es').
   * Also accepts locale codes like 'en-US' (falls back to base language).
   * @default 'en'
   */
  lang?: string;
  /**
   * Whether to include an adjective in the ID
   * @default true
   */
  adjective?: boolean;
  /**
   * Whether to include a color in the ID
   * @default true
   */
  color?: boolean;
  /**
   * Whether to include a noun in the ID
   * @default true
   */
  noun?: boolean;
  /**
   * Whether to randomize the order of components
   * @default false
   */
  randomOrder?: boolean;
  /**
   * Character(s) used to separate ID components
   * @default '-'
   */
  separator?: string;
  /**
   * Return an object with individual parts instead of a string
   * @default false
   */
  asObject?: boolean;
  /**
   * Custom component ordering per language.
   * @default { en: ['adjective', 'color', 'noun', 'number'], es: ['noun', 'color', 'adjective', 'number'] }
   */
  semantics?: SemanticsMap;
  /**
   * Configuration for the number component(s)
   * @default { min: 0, max: 9999, sets: 1, completeWithZeros: false }
   */
  number?: NumberSettings;
  /**
   * Custom dictionary to use (can partially override built-in words)
   */
  dictionary?: Partial<Dictionary>;
  /**
   * Source of randomness: a function returning a float in [0, 1), like
   * `Math.random`. Pass {@link cryptoRandom} (or your own CSPRNG-backed
   * function) when an ID doubles as a secret, such as an invite code or a
   * passphrase, so it cannot be predicted from earlier IDs.
   * @default Math.random
   *
   * @example
   * ```typescript
   * import { generateId, cryptoRandom } from 'human-ids';
   * generateId({ random: cryptoRandom });
   * ```
   */
  random?: () => number;
}

/**
 * Default settings applied when options are not specified.
 * @internal
 */
const defaultSettings: Required<Pick<IdGeneratorSettings, 'lang' | 'adjective' | 'color' | 'noun' | 'randomOrder' | 'separator' | 'asObject' | 'semantics' | 'number'>> = {
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
    max: 9999,
    sets: 1,
    completeWithZeros: false,
  },
};

/**
 * A `random` source backed by the Web Crypto API, for IDs that must be
 * unguessable. Available in browsers, Node.js 19+, Deno, Bun and edge runtimes;
 * throws where `globalThis.crypto` is missing.
 *
 * @returns A float in [0, 1)
 *
 * @example
 * ```typescript
 * generateId({ random: cryptoRandom });
 * ```
 */
function cryptoRandom(): number {
  const buffer = new Uint32Array(1);
  globalThis.crypto.getRandomValues(buffer);
  return buffer[0] / 0x100000000;
}

/**
 * Generates a random integer between min and max (inclusive).
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @param random - Source of randomness in [0, 1)
 * @returns Random integer in the range [min, max]
 * @internal
 */
function getRandomNumber(min: number, max: number, random: () => number): number {
  return Math.floor(random() * (max - min + 1)) + min;
}

/**
 * Picks a random element from an array.
 * @param arr - Array to pick from
 * @param random - Source of randomness in [0, 1)
 * @returns Random element from the array
 * @internal
 */
function pickRandom(arr: string[], random: () => number): string {
  return arr[Math.floor(random() * arr.length)];
}

/**
 * Fisher-Yates shuffle. A `sort` with a random comparator is biased and its
 * output depends on the engine's sort algorithm.
 * @param items - Items to shuffle (not mutated)
 * @param random - Source of randomness in [0, 1)
 * @returns A shuffled copy
 * @internal
 */
function shuffle<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Resolves a language code to a supported language.
 * Supports full locale codes (e.g., 'en-US' resolves to 'en').
 * Falls back to 'en' if language is not supported.
 * @param lang - Language code to resolve
 * @returns Resolved language code ('en' or 'es')
 * @internal
 */
function resolveLang(lang: string): string {
  if (dictionaries[lang]) return lang;
  const base = lang.split('-')[0];
  if (dictionaries[base]) return base;
  return 'en';
}

/**
 * Generates a human-readable ID by combining adjectives, colors, nouns, and numbers.
 *
 * @param settings - Configuration options (with asObject: true)
 * @returns Object containing individual ID components
 *
 * @example
 * ```typescript
 * // Get ID as object
 * const parts = generateId({ asObject: true });
 * // { adjective: 'happy', color: 'blue', noun: 'cat', number1: '1234' }
 * ```
 */
function generateId(settings?: IdGeneratorSettings & { asObject: true }): IdParts;
/**
 * Generates a human-readable ID by combining adjectives, colors, nouns, and numbers.
 *
 * @param settings - Configuration options
 * @returns Human-readable ID string
 *
 * @example
 * ```typescript
 * // Basic usage - returns string like "happy-blue-cat-1234"
 * const id = generateId();
 *
 * // Spanish language
 * const spanishId = generateId({ lang: 'es' });
 * // "gato-azul-feliz-5678"
 *
 * // Custom separator
 * const underscoreId = generateId({ separator: '_' });
 * // "happy_blue_cat_9012"
 *
 * // Without colors
 * const noColorId = generateId({ color: false });
 * // "happy-cat-3456"
 *
 * // Custom number range
 * const customNumberId = generateId({
 *   number: { min: 100, max: 999, completeWithZeros: true }
 * });
 * // "happy-blue-cat-042"
 *
 * // Multiple number sets
 * const multiNumberId = generateId({ number: { sets: 2 } });
 * // "happy-blue-cat-1234-5678"
 *
 * // Random component order
 * const randomOrderId = generateId({ randomOrder: true });
 * // "1234-cat-happy-blue" (random order each time)
 *
 * // Custom dictionary (partial override)
 * const customId = generateId({
 *   dictionary: {
 *     adjectives: { cool: 'cool', awesome: 'awesome' }
 *   }
 * });
 * ```
 */
function generateId(settings?: IdGeneratorSettings): string;
function generateId(userSettings: IdGeneratorSettings = {}): string | IdParts {
  const settings = { ...defaultSettings, ...userSettings };
  const random = settings.random || Math.random;
  const lang = resolveLang(settings.lang);
  const numberMin =
    settings.number && settings.number.min !== undefined ? settings.number.min : 0;
  const numberMax =
    settings.number && settings.number.max !== undefined ? settings.number.max : 999;
  const numberSets = (settings.number && settings.number.sets) || 1;
  const completeWithZeros =
    (settings.number && settings.number.completeWithZeros) || false;

  const customDict = settings.dictionary;
  const builtinDict = dictionaries[lang];
  const resolved: Dictionary = customDict
    ? {
        adjectives: customDict.adjectives ? [...new Set(customDict.adjectives)] : builtinDict.adjectives,
        colors: customDict.colors ? [...new Set(customDict.colors)] : builtinDict.colors,
        nouns: customDict.nouns ? [...new Set(customDict.nouns)] : builtinDict.nouns,
      }
    : builtinDict;

  const parts: Record<string, string> = {};

  if (settings.adjective) {
    parts.adjective = pickRandom(resolved.adjectives, random);
  }

  if (settings.color) {
    parts.color = pickRandom(resolved.colors, random);
  }

  if (settings.noun) {
    parts.noun = pickRandom(resolved.nouns, random);
  }

  const maxNumberLength = completeWithZeros ? numberMax.toString().length : 0;
  for (let i = 0; i < numberSets; i++) {
    const num = getRandomNumber(numberMin, numberMax, random);
    parts[`number${i + 1}`] = completeWithZeros
      ? num.toString().padStart(maxNumberLength, '0')
      : num.toString();
  }

  if (settings.randomOrder) {
    return shuffle(Object.keys(parts), random)
      .map((key) => parts[key])
      .join(settings.separator);
  }

  if (settings.asObject) {
    return parts;
  }

  const semantics = (settings.semantics && settings.semantics[lang]) || settings.semantics!.en;

  const result = semantics.map((key) => {
    if (key !== 'number') return parts[key];

    // Collect all number parts directly instead of filtering with isNaN
    const numberParts: string[] = [];
    for (let i = 1; i <= numberSets; i++) {
      numberParts.push(parts[`number${i}`]);
    }
    return numberParts.join('-');
  });
  return result.join(settings.separator);
}

export { generateId, cryptoRandom, dictionaries };
