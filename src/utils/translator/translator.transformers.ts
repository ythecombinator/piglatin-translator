import {
  adjust,
  always,
  both,
  complement,
  cond,
  converge,
  head,
  identity,
  ifElse,
  insert,
  join,
  juxt,
  last,
  lensIndex,
  map,
  over,
  pipe,
  reduce,
  replace,
  reverse,
  split,
  T as defaultsTo,
  test,
  toLower,
  toPairs,
  toUpper,
} from 'ramda';

import {reduceIndexed} from 'utils/function';
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

//  RULE: Punctuation must remain in the same relative place from the end of the word.

type PunctuationIndexes = { [k: string]: number };

const mapPunctuationIndexes = pipe<string[], string[], PunctuationIndexes>(
  reverse,
  reduceIndexed<string, PunctuationIndexes>((acc, char, idx) => {
    return isPunctuation(char) ? { ...acc, [char]: idx } : acc;
  }, {})
);

const applyPunctuations = (indexes: PunctuationIndexes, letters: string[]) =>
  reduce(
    (acc: string[], punctuation: [string, number]) => {
      const char = punctuation[0];
      const index = acc.length - punctuation[1];
      return insert(index, char, acc);
    },
    letters,
    toPairs(indexes)
  );

export const handlePunctuationOf = (original: string) =>
  cond<string, string>([
    [always(!isPunctuation(original)), identity],
    [
      defaultsTo,
      pipe(
        juxt<string[], string, string>([always(original), identity]),
        map(split("")),
        over(lensIndex(0), mapPunctuationIndexes),
        converge(applyPunctuations, [head, last]),
        join("")
      ),
    ],
  ]);
