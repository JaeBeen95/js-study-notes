export default function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function recursion(...newArgs) {
        return curried(...args, ...newArgs);
      };
    }
  };
}
