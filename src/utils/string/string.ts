import {split, test} from 'ramda';

import {punctuationRegex} from 'utils/regex';

export const stringToArray = split(/[\s]+/);

export const isPunctuation = test(punctuationRegex);

export const isUpperCase = (char: string) => char === char.toUpperCase();
