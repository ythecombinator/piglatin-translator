## Overview

Pig Latin is a language game with the following rules:

- Words that start with a consonant have their first letter moved to the end of the word and the letters `ay` added to the end.
  - **Hello** becomes **Ellohay**
- Words that start with a vowel have the letters `way` added to the end.
  - **apple** becomes **appleway**
- Words that end in `way` are not modified.
  - **stairway** stays as **stairway**
- Punctuation must remain in the same relative place from the end of the word.
  - **can’t** becomes **antca’y**
  - **end.** becomes **endway.**
- Hyphens are treated as two words
  - **this-thing** becomes **histay-hingtay**
- Capitalization must remain in the same place.
  - **Beach** becomes **Eachbay**
  - **McCloud** becomes **CcLoudmay**

## Getting Started

Clone the repository.

```sh
git clone https://github.com/ythecombinator/piglatin-translator
```

`cd` into the directory.

```sh
cd piglatin-translator
```

Install the project dependencies:

```sh
yarn

# or

npm install
```

Start the development server:

```sh
yarn start

# or

npm run start
```

🚀 Head over to [localhost:3000](http://localhost:3000) in your browser of choice.

To run tests, do:

```sh
yarn test

# or

npm run test
```

## Toolbelt

- [x] [Typescript](https://www.typescriptlang.org) for compile-time safety
- [x] [React](https://reactjs.org) as a UI language
- [x] [Ramda](https://ramdajs.com/) as an opinionated functional programming helper
- [x] [Material UI](https://material-ui.com) as a design toolkit
- [x] [Netlify](https://www.netlify.com) to deploy production environment
