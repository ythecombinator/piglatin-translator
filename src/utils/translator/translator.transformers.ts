import {head, identity, ifElse, juxt, last, pipe, replace, test, toLower} from 'ramda';

import {globalPunctuationRegex, vowelsRegex} from 'utils/regex';

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
