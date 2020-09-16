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

## A few notes on technical decisions

### Functional Programming

I tried to benefit from a declarative functional-based approach because:

- Pure functions written at a higher level are easier to reason about
- Function composition allows me to take simpler functions, and combine them into a single, more complex function that performs each of the sub-functions in a logical sequence on whatever data I pass in
- Function signatures are more meaningful (which is a nice match with TypeScript)
- Testing gets easier (pure functions match well to techniques like property-based testing)
- Thus debugging is easier
- The outcome application is more bulletproof

### Functional Utility Belt Usage

Some teams might not feel comfortable with the adoption of a functional utility belt like ramda. We could use normal side-effectful imperative approaches combined with an immutability helper, like [immer](https://github.com/immerjs/immer), instead.

For example, let's get `handleCaseOf` transformer:

At a first glance, it might seem a bit difficult to reason about its behavior because of the number of functions involved. Another way of achieving the same behavior would be:

```tsx
const handleCaseOf = (original: string) => (parsed: string) => {
  const lettersParsed = parsed.split("");
  const lettersOriginal = original.split("");

  lettersOriginal.forEach((letter, index) => {
    if (!punctuationRegex.test(letter) && letter === letter.toUpperCase()) {
      lettersParsed[index] = lettersParsed[index].toUpperCase();
    }
  });

  return lettersParsed.join("");
};
```

We could rewrite it wrapping with `produce` utility from immer which would guarantee immutability but we would miss advantages from ramda like auto-curried functions which help us with partial application and function composition.

### Time and Space Complexity

Both are linear when it comes to the sentence length (number of characters passed as input).

### Scaling

Although this application core is quite simple, it's designed in a way adding new rules/behaviors is trivial, given it only requires you to:

- Express this behavior as a simple pure function inside `translator.transformers`
- Pipe this function in the `applyTransformers` function

### Testing

There are more testing approaches relevant for this app which are out of scope for its first iteration. To mention:

#### Property

To ensure correctness, we could do a mathematical proof, using induction. This would be the safest approach but also the hardest one. Unless we use a proof assistant, like Coq or Isabelle, the proof is done manually. The problem of this approach is that the proof is related to the mathematical function, and not the TypeScript implementation. Therefore, the property can be proved correct but the implementation may still be wrong.

To tackle this, we could use property-based testing, which consists of generative testing. With them, we don't need to supply specific example inputs with expected outputs (like the ones in the overview section) as with unit tests. Instead, we could define properties about the code and use a generative-testing engine (e.g., [fast-check](https://github.com/dubzzz/fast-check)) to create randomized inputs to ensure the defined properties are correct.

The unit tests under `.spec` files still have their place, though. They are important for the early stages of TDD (like the MVP of this translator web app, for example) because they serve as anchor points to ensure that the development efforts proceed as desired (like accomplishing what is described in the provided Pig Latin spec).

Eventually, these example-based tests end up being passive tests; the tests become part of a regression suite and provide no new information about the functionality. Property-based tests, however, are always active tests as they generate new data each time the test suite is run.

We could come up with some custom [arbitraries](https://github.com/dubzzz/fast-check/blob/master/documentation/Arbitraries.md) for each of our rules—e.g.

- Sets of words that start with vowels
- Sets of words that start with consonants
- Sets of words that end in `way`
- And so on...

And then check against them.

#### Component

For our components, we could shallow test our hooks with [Enzyme](https://enzymejs.github.io/enzyme/).

For example, we could have tests in our `Translator` component to ensure that `originalText` state changes properly on `TextField` events and also to ensure that `useEffect` properly reacts to these updating `translatedText` state.

#### E2E

To ensure the UI itself behaves as expected, we could have [Cypress](https://www.cypress.io/) (or similar) automatically testing functionality as close as possible to a real user.
