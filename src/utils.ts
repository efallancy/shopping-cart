// Utility helper to compose functions that accepts single argument
function pipe(...fns: Function[]) {
  return function apply<T>(xs: T) {
    return fns.reduce((x, f) => f(x), xs);
  }
}

export { pipe };
