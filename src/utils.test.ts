import { pipe } from './utils';

describe('Utility helper', () => {
  describe('pipe', () => {
    it('should return a function after accepting functions as argument', () => {
      const identityFn = (x: number): number => x;
      const identityFn2 = (x: number): number => x;
      const pipeFn = pipe(identityFn, identityFn2);

      expect(typeof pipeFn).toEqual('function');
    });

    it('should return value of composed functions', () => {
      const addByTwo = (x: number): number => x + 2;
      const multiplyByThree = (x: number): number => x * 3;

      const pipeFn = pipe(addByTwo, multiplyByThree);

      expect(pipeFn(2)).toEqual(12);
    });
  });
});
