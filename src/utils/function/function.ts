// Ramda reduce doesn't work well with R.add Index(R.reduce) on TypeScript,
// which should be the ramda way of getting an indexed version of reduce.

type IndexedReducer<T, TResult> = (
  acc: TResult,
  val: T,
  index: number
) => TResult;

export const reduceIndexed = <T, TResult>(
  reducer: IndexedReducer<T, TResult>,
  initialValue: TResult
) => (list: T[]) => {
  return list.reduce<TResult>(reducer, initialValue);
};
