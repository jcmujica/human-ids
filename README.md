# Human IDs

A library to generate human-readable IDs.

## Description

Human IDs is a JavaScript library that allows you to generate human-readable IDs. The IDs consist of a combination of adjectives, colors, nouns, and numbers, creating unique and memorable identifiers.

Supports English and Spanish
## Output example
    bubbly-beige-fire-38
    breezy-teal-faith-870
    silly-indigo-imagination-440
    genuine-turquoise-light-718
    bubbly-purple-pen-450
    genuine-silver-magic-935
    delightful-brown-planet-642
    cozy-orange-boat-449
    excelente-morado-creatividad-829
    energetico-oliva-libertad-765
## Installation

To use Human IDs in your project, you can install it via npm:

```she
npm install human-ids
```

```javascript
import humanId from 'human-ids'

// Initialize the settings object (these are the defaults)
const settings = {
  lang: 'en',
  adjective: true,
  color: true,
  noun: true,
  number: {
    min: 0,
    max: 999,
    sets: 1,
    completeWithZeros: false,
  },
};

// Generate an ID using the function
console.log(humanId())
```
## Configuration

The settings object allows you to customize the ID generation process. The available options are:

    lang: The language of the generated words (e.g., 'en' for English, 'es' for Spanish).
    adjective: Set to true to include an adjective in the ID (default: false).
    color: Set to true to include a color in the ID (default: false).
    noun: Set to true to include a noun in the ID (default: false).
    number: An object that configures the number part of the ID:
        min: The minimum value of the number (default: 0).
        max: The maximum value of the number (default: 999).
        completeWithZeros: Set to true to pad the number with leading zeros (default: false).
        sets: The number of sets of random numbers to include, separated by a hyphen (-) (default: 1).

## Test Results

While the generated IDs strive for uniqueness, it's important to note that absolute uniqueness cannot be guaranteed, especially with a finite set of words and numbers. During the uniqueness test, the generator produced 999,722 unique IDs out of the expected 1,000,000. This means that a small number of duplicates may occur in practice.
License

This project is licensed under the ISC License.

Feel free to modify the `README.md` file to fit your project's specific details and requirements.