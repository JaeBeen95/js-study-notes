export default function memoize<A, R>(func: (arg: A) => R) {
  const cache = new Map<A, R>();

  function memoized(arg: A): R {
    if (cache.has(arg)) {
      return cache.get(arg)!;
    } else {
      const result = func(arg);
      cache.set(arg, result);
      return result;
    }
  }

  memoized.cache = cache;

  return memoized;
}
