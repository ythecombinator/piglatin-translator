import {
  always,
  cond,
  identity,
  isEmpty,
  join,
  map,
  pipe,
  split,
  T as defaultsTo,
  test,
  trim,
} from 'ramda';

import {stringToArray} from 'utils/string';

import {clearWord, handleCaseOf, handlePunctuationOf, handleSound} from './translator.transformers';

const keywordRegex = /way$/;

const applyTransformers = (original: string) => {
  // Some transformers might need to be curried to take the original string as a param
  const handleCase = handleCaseOf(original);
  const handlePunctuation = handlePunctuationOf(original);

  const result = cond([
    // We should not apply any transformation on empty strings.
    [isEmpty, always("")],
    // RULE: Words that end in “way” are not modified.
    // Thus we should apply an identity function to it.
    // This does not go to `.transformers` because it makes no changes to the data.
    [test(keywordRegex), identity],
    // All transformers should be composed here:
    [defaultsTo, pipe(clearWord, handleSound, handleCase, handlePunctuation)],
  ])(original);

  return result;
};

// RULE: Hyphens are treated as two words
const transform = pipe(split("-"), map(applyTransformers), join("-"));

// API
export const translate = pipe(trim, stringToArray, map(transform), join(" "));
