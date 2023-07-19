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
## Usage example

```javascript
import humanId from 'human-ids'

//If using a custom dictionary
const customDictionary = {
  adjectives: {
    awesome: 'awesome',
    amazing: 'amazing',
    // ...
  },
  colors: {
    red: 'red',
    blue: 'blue',
    // ...
  },
  nouns: {
    cat: 'cat',
    dog: 'dog',
    // ...
  },
};

// Initialize the settings object (these are the defaults)
const settings = {
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

// Generate an ID using the function
console.log(humanId())
```
## Configuration

The settings object allows you to customize the ID generation process. The available options are:

    userSettings (optional): An object containing various options to customize the generated ID. It includes the following properties:
        lang (string): The language for the ID generation. You can specify the language code (e.g., 'en' for English, 'es' for Spanish).
        adjective (boolean): Include an adjective component in the generated ID. (Default: true)
        color (boolean): Include a color component in the generated ID. (Default: true)
        noun (boolean): Include a noun component in the generated ID. (Default: true)
        randomOrder (boolean): Randomize the order of ID components. (Default: false)
        separator (string): The separator used to join the ID components. (Default: '-')
        asObject (boolean): Return the ID as an object instead of a string. (Default: false)
        semantics (object|null): An object specifying the order of components based on language. For example, you can set the order for Spanish using "es": ['noun', 'color', 'adjective', 'number'].
        number (object): An object containing settings for the number component:
            min (number): The minimum value for the number component. (Default: 0)
            max (number): The maximum value for the number component. (Default: 999)
            completeWithZeros (boolean): Pad the number with leading zeros to match the maximum length. (Default: false)
        dictionary (object): An object containing custom dictionaries for adjectives, colors, and nouns:
            adjectives (object): A dictionary of adjectives for different languages.
            colors (object): A dictionary of colors for different languages.
            nouns (object): A dictionary of nouns for different languages.

## Return Value
The generateId function returns a unique identifier as a string by default. If the asObject option is set to true, the function returns an object containing the individual components of the ID.

## Examples

### Generate an ID with default settings:

```javascript

const id = generateId({ lang: 'en' });
console.log(id); // Example output: "green-house-123"
```

### Generate an ID as an object:

```javascript

const idObject = generateId({ lang: 'es', asObject: true });
console.log(idObject);
// Example output:
// {
//   adjective: 'casa',
//   color: 'verde',
//   noun: 'montaña',
//   number: '0123'
// }
```
## Test Results

While the generated IDs strive for uniqueness, it's important to note that absolute uniqueness cannot be guaranteed, especially with a finite set of words and numbers. During the uniqueness test, the generator produced 999,722 unique IDs out of the expected 1,000,000. This means that a small number of duplicates may occur in practice.
License

This project is licensed under the ISC License.

Feel free to modify the `README.md` file to fit your project's specific details and requirements.

## Contributing

Contributions and bug reports are welcome! Feel free to open an issue or submit a pull request on the GitHub repository. Please ensure that your code follows the project's coding standards and includes appropriate test coverage.
## License

This project is licensed under the MIT License.