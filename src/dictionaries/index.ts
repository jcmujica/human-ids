import type { Dictionary } from '../index';
import { en } from './en';
import { es } from './es';

/**
 * Built-in dictionaries indexed by language code.
 * Currently supports 'en' (English) and 'es' (Spanish).
 *
 * @example
 * ```typescript
 * import { dictionaries } from 'human-ids';
 *
 * // Access English adjectives
 * const englishAdjectives = dictionaries.en.adjectives;
 *
 * // Check available languages
 * const languages = Object.keys(dictionaries); // ['en', 'es']
 * ```
 */
const dictionaries: Record<string, Dictionary> = {
  en,
  es,
};

export { dictionaries };
