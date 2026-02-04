/**
 * Dictionary management module for human-ids.
 * Handles built-in dictionaries and caching of resolved word arrays.
 * @module dictionaries
 * @internal
 */

import type { Dictionary } from '../index';
import { en } from './en';
import { es } from './es';

/**
 * Dictionary with word lists converted to arrays for efficient random selection.
 * @internal
 */
export interface ResolvedDictionary {
  /** Array of adjective words */
  adjectives: string[];
  /** Array of color words */
  colors: string[];
  /** Array of noun words */
  nouns: string[];
}

/**
 * Built-in dictionaries indexed by language code.
 * Currently supports 'en' (English) and 'es' (Spanish).
 *
 * @example
 * ```typescript
 * import { dictionaries } from 'human-ids';
 *
 * // Access English adjectives
 * const englishAdjectives = Object.keys(dictionaries.en.adjectives);
 *
 * // Check available languages
 * const languages = Object.keys(dictionaries); // ['en', 'es']
 * ```
 */
const dictionaries: Record<string, Dictionary> = {
  en,
  es
};

/**
 * Cache for resolved dictionaries to avoid repeated Object.values() calls.
 * @internal
 */
const resolvedCache = new Map<Dictionary, ResolvedDictionary>();

/**
 * Converts a Dictionary (with Record objects) to a ResolvedDictionary (with arrays).
 * Results are cached for performance.
 *
 * @param dict - Dictionary to resolve
 * @returns Dictionary with word lists as arrays
 * @internal
 */
function resolveDictionary(dict: Dictionary): ResolvedDictionary {
  let resolved = resolvedCache.get(dict);
  if (!resolved) {
    resolved = {
      adjectives: Object.values(dict.adjectives),
      colors: Object.values(dict.colors),
      nouns: Object.values(dict.nouns),
    };
    resolvedCache.set(dict, resolved);
  }
  return resolved;
}

export { dictionaries, resolveDictionary };
