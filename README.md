# Human IDs

[![npm version](https://img.shields.io/npm/v/human-ids.svg)](https://www.npmjs.com/package/human-ids)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

A zero-dependency TypeScript library that generates human-readable IDs by combining adjectives, colors, nouns, and numbers. Perfect for creating memorable identifiers for users, sessions, or any entity that needs a friendly name.

## Features

- **Human-readable**: Generated IDs like `stellar-jade-horizon-7392` are easy to remember and communicate
- **Multi-language**: Built-in support for English and Spanish with proper word ordering
- **Highly unique**: ~209 billion possible combinations per language
- **Zero dependencies**: Lightweight and secure
- **TypeScript**: Full type definitions with JSDoc documentation
- **Customizable**: Configure separators, components, number ranges, and even provide custom dictionaries

## Installation

```bash
npm install human-ids
```

## Quick Start

```javascript
import generateId from 'human-ids';

// Generate a random ID
const id = generateId();
// => "stellar-jade-horizon-7392"

// Spanish
const spanishId = generateId({ lang: 'es' });
// => "aurora-esmeralda-brillante-4518"
```

## Output Examples

```
English:                          Spanish:
bubbly-amber-phoenix-3847         aurora-cobalto-magnifico-6729
stellar-jade-horizon-7392         cascada-esmeralda-valiente-1854
cosmic-sapphire-nebula-9034       bosque-ambar-sereno-5043
radiant-coral-serenity-2671       estrella-jade-luminoso-8156
```

## Usage

### Basic Usage

```javascript
import generateId from 'human-ids';

// Default: English, all components enabled
const id = generateId();
```

### Configuration Options

```javascript
const id = generateId({
  lang: 'en',              // Language: 'en' or 'es'
  adjective: true,         // Include adjective
  color: true,             // Include color
  noun: true,              // Include noun
  separator: '-',          // Component separator
  randomOrder: false,      // Shuffle component order
  asObject: false,         // Return object instead of string
  number: {
    min: 0,                // Minimum number value
    max: 9999,             // Maximum number value
    sets: 1,               // Number of number components
    completeWithZeros: false // Pad with leading zeros
  }
});
```

### Examples

#### Without Colors

```javascript
generateId({ color: false });
// => "happy-cat-3456"
```

#### Custom Separator

```javascript
generateId({ separator: '_' });
// => "happy_blue_cat_9012"
```

#### Multiple Number Sets

```javascript
generateId({ number: { sets: 2 } });
// => "happy-blue-cat-1234-5678"
```

#### Zero-Padded Numbers

```javascript
generateId({ number: { min: 0, max: 999, completeWithZeros: true } });
// => "happy-blue-cat-042"
```

#### Get ID as Object

```javascript
generateId({ asObject: true });
// => { adjective: 'happy', color: 'blue', noun: 'cat', number1: '1234' }
```

#### Random Component Order

```javascript
generateId({ randomOrder: true });
// => "1234-cat-happy-blue" (random each time)
```

#### Custom Dictionary

```javascript
generateId({
  dictionary: {
    adjectives: { cool: 'cool', awesome: 'awesome' },
    colors: { red: 'red', blue: 'blue' },
    nouns: { rocket: 'rocket', star: 'star' }
  }
});
// => "cool-red-rocket-5678"
```

## CommonJS Support

```javascript
// Default import
const generateId = require('human-ids');

// Named imports
const { generateId, dictionaries } = require('human-ids');
```

## Uniqueness & Collision Probability

The library includes extensive dictionaries to maximize uniqueness:

| Language | Adjectives | Colors | Nouns | Numbers (default) | Total Combinations |
|----------|------------|--------|-------|-------------------|-------------------|
| English  | 372        | 120    | 469   | 10,000 (0-9999)   | ~209 billion      |
| Spanish  | 372        | 120    | 469   | 10,000 (0-9999)   | ~209 billion      |

With ~209 billion combinations, collision probability is negligible for most use cases. For even higher uniqueness:

- **Increase number range**: `{ number: { max: 99999 } }` → 10x more combinations
- **Use multiple number sets**: `{ number: { sets: 2 } }` → 10,000x more combinations
- **Combine both**: ~20 quadrillion combinations

> **Note**: While collision probability is extremely low, absolute uniqueness cannot be guaranteed with random generation. For guaranteed uniqueness, implement collision detection with your datastore.

## API Reference

### `generateId(settings?): string | IdParts`

Generates a human-readable ID.

#### Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `lang` | `string` | `'en'` | Language code (`'en'` or `'es'`) |
| `adjective` | `boolean` | `true` | Include adjective component |
| `color` | `boolean` | `true` | Include color component |
| `noun` | `boolean` | `true` | Include noun component |
| `separator` | `string` | `'-'` | Separator between components |
| `randomOrder` | `boolean` | `false` | Randomize component order |
| `asObject` | `boolean` | `false` | Return object instead of string |
| `number.min` | `number` | `0` | Minimum number value |
| `number.max` | `number` | `9999` | Maximum number value |
| `number.sets` | `number` | `1` | Number of number components |
| `number.completeWithZeros` | `boolean` | `false` | Pad numbers with leading zeros |
| `dictionary` | `Partial<Dictionary>` | - | Custom word dictionary |

#### Returns

- **String** (default): `"adjective-color-noun-number"`
- **Object** (when `asObject: true`): `{ adjective, color, noun, number1, ... }`

### `dictionaries`

Access the built-in word dictionaries:

```javascript
import { dictionaries } from 'human-ids';

console.log(Object.keys(dictionaries));        // ['en', 'es']
console.log(Object.keys(dictionaries.en));     // ['adjectives', 'colors', 'nouns']
```

## Contributing

Contributions and bug reports are welcome! Feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/jcmujica/human-ids).

## License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).
