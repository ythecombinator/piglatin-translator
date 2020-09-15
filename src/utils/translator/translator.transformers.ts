import {
  adjust,
  both,
  complement,
  head,
  identity,
  ifElse,
  join,
  juxt,
  last,
  pipe,
  reduce,
  replace,
  test,
  toLower,
  toUpper,
} from 'ramda';

import {globalPunctuationRegex, vowelsRegex} from 'utils/regex';
import {isPunctuation, isUpperCase} from 'utils/string';

// Remove all punctuation characters and converts result to lower case

export const clearWord = pipe<string, string, string>(
  replace(globalPunctuationRegex, ""),
  toLower
);

// RULE: Words that start with a consonant have their first letter moved to the end of the word and the letters “ay” added to the end.
// RULE: Words that start with a vowel have the letters “way” added to the end.

const handleVowelSound = (s: string) => `${s}way`;
const handleConsonantSound = (s: string) => `${s.slice(1)}${s[0]}ay`;

export const handleSound = pipe<string, [string, string], string>(
  juxt<string[], string, string>([head, identity]),
  ifElse(
    pipe(head, test(vowelsRegex)),
    pipe(last, handleVowelSound),
    pipe(last, handleConsonantSound)
  )
);

// RULE: Capitalization must remain in the same place.

const shouldCapitalize = both(complement(isPunctuation), isUpperCase);

export const handleCaseOf = (original: string) => (parsed: string) => {
  const lettersParsed = parsed.split("");
  const lettersOriginal = original.split("");

  const indexesReducer = (indexes: number[], letter: string, index: number) =>
    shouldCapitalize(letter) ? [...indexes, index] : indexes;

  const indexesToCapitalize = lettersOriginal.reduce(indexesReducer, []);

  const lettersReducer = (acc: string[], idx: number) =>
    adjust(idx, toUpper, acc);

  return join("", reduce(lettersReducer, lettersParsed, indexesToCapitalize));
};
