# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**human-ids** is a zero-dependency TypeScript library that generates human-readable IDs by combining adjectives, colors, nouns, and numbers. Supports English and Spanish with ~209 billion unique combinations per language. Published on npm as `human-ids`.

## Commands

- **Build:** `npm run build` (compiles TypeScript from `src/` to `dist/`)
- **Run tests:** `npm test` (Jest with ts-jest, HTML reporter output to `test-report.html`)

## Architecture

TypeScript sources live in `src/`, compiled output goes to `dist/`. The package ships compiled JS with auto-generated `.d.ts` declarations.

Single exported function `generateId(settings)` in `src/index.ts` that assembles ID components based on a configuration object. Returns a string by default or an object when `asObject: true`. Uses function overloads for type-safe return values. Full JSDoc documentation on all public APIs.

**Dictionaries** (`src/dictionaries/`) contain per-language word lists (`en.ts`, `es.ts`) aggregated by `src/dictionaries/index.ts`. Each dictionary exports `{ adjectives, colors, nouns }` as `Record<string, string>` objects.

**Dictionary sizes** (both languages identical): 372 adjectives, 120 colors, 469 nouns. Default number range is 0-9999.

**Word ordering** is language-dependent: English uses `adjective-color-noun-number`, Spanish uses `noun-color-adjective-number`. Custom dictionaries can be passed via the `dictionary` setting.
