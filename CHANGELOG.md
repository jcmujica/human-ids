# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2026-11-17

### Added
- **`random` option**: inject the source of randomness (any function returning a float in [0, 1)). Defaults to `Math.random`, so existing calls are unchanged.
- **`cryptoRandom` export**: a Web Crypto–backed source for IDs that must be unguessable, such as invite codes or passphrases.

### Fixed
- **`randomOrder` shuffle is now unbiased**: replaced the random-comparator `sort` with a Fisher–Yates shuffle that also uses the configured `random` source.

## [2.0.0] - 2026-02-25

### Breaking Changes
- **Dictionary type changed**: `Dictionary.adjectives`, `.colors`, and `.nouns` are now `string[]` instead of `Record<string, string>`. Custom dictionaries must be updated from object form (`{ cool: 'cool' }`) to array form (`['cool']`).
- **Removed bare CJS default export**: `const generateId = require('human-ids')` (without destructuring) no longer works. Use `const { generateId } = require('human-ids')` instead.

### Added
- **ESM support**: Package now ships both CommonJS (`dist/cjs/`) and ES Module (`dist/esm/`) builds with a full `exports` map. Bundlers and native ESM consumers are automatically served the correct build.

### Fixed
- **ESM crash**: The previous release would throw `ReferenceError: module is not defined` at module load time when imported as ESM. This is now fixed.

### Changed
- **Smaller package**: Dictionary files are ~47% smaller by storing word lists as plain arrays instead of key-value objects where key === value.
- Internal `resolveDictionary` helper and its `Map` cache removed — no longer needed now that dictionaries are already arrays.

## [1.2.0] - 2026-02-04

### Added
- **Massively expanded dictionaries**: Both English and Spanish now have 372 adjectives, 120 colors, and 469 nouns (~209 billion combinations each)
- **JSDoc documentation**: Full inline documentation with examples for all public APIs

### Changed
- **Default number range**: Increased from 0-999 to 0-9999 for better uniqueness
- **Improved README**: Complete rewrite with better examples, API reference, and documentation

## [1.1.0] - 2024-01-15
### Changed
- Migrated to TypeScript
- Added type definitions

## [1.0.14] - 2023-07-19
### Added
- Added semantics support to be passed as user settings to oder words according to the language
- Added default semantics for english and spanish languages
## [1.0.13] - 2023-07-10
### Added
- Added asObject setting to return an object with the words
## [1.0.12] - 2023-07-07
### Fixed
- Fixed bug with undefined disctionaries
## [1.0.11] - 2023-07-07
### Fixed
- Fixed bug with custom dictionaries
## [1.0.10] - 2023-07-07
### Added
- Added separator customization
- Added random ordering for segments
- Added support for custom dictionary
## [1.0.9] - 2023-07-07
### Changed
- Changed removed init console.log
## [1.0.8] - 2023-07-07
### Changed
- Changed README.md to correctly display usage information
## [1.0.7] - 2023-07-07
### Changed
- Changed README.md to correctly display usage information
## [1.0.6] - 2023-07-07
### Changed
- Changed README.md to correctly display usage information
## [1.0.5] - 2023-07-07
### Remove
- Removed tests file
## [1.0.4] - 2023-07-07
### Fixed
- Fixed module definition
## [1.0.3] - 2023-07-07
### Added
- Added default settings
## [1.0.2] - 2023-07-07
### Changed
- Refactor into function
## [1.0.1] - 2023-07-07
### Added
- Added Changelog
- Added gitignore and git link in package.json
## [1.0.0] - 2023-07-07
### Added
- A library to generate human-readable IDs.