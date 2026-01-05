import { deepMerge } from './index.js';

describe('helpers', () => {
  describe('deepMerge', () => {
    it('should merge two simple objects', () => {
      const target = { a: 1, b: 2 };
      const source = { b: 3, c: 4 };
      const result = deepMerge(target, source);

      expect(result).toStrictEqual({ a: 1, b: 3, c: 4 });
    });

    it('should perform deep merge on nested objects', () => {
      const target = { a: { b: 1 } };
      const source = { a: { c: 2 }, d: 4 };
      const result = deepMerge(target, source);

      expect(result).toStrictEqual({ a: { b: 1, c: 2 }, d: 4 });
    });

    it('should override primitive values with objects', () => {
      const target = { a: 1 };
      const source = { a: { b: 2 } };
      const result = deepMerge(target, source);

      expect(result).toStrictEqual({ a: { b: 2 } });
    });

    it('should override objects with primitive values', () => {
      const target = { a: { b: 1 } };
      const source = { a: 2 };
      const result = deepMerge(target, source);

      expect(result).toStrictEqual({ a: 2 });
    });

    it('should merge arrays by reference', () => {
      const target = { a: [1, 2, 3] };
      const source = { a: [4, 5] };
      const result = deepMerge(target, source);

      expect(result).toStrictEqual({ a: [4, 5] });
    });

    it('should not treat null as an object', () => {
      const target = { a: { b: 1 } };
      const source = { a: null };
      const result = deepMerge(target, source);

      expect(result).toStrictEqual({ a: null });
    });

    it('should work with undefined values', () => {
      const target = { a: 1, b: 2 };
      const source = { b: undefined, c: undefined };
      const result = deepMerge(target, source);

      expect(result).toStrictEqual({ a: 1, b: 2, c: undefined });
      expect(deepMerge(target, {})).toStrictEqual(target);
      expect(deepMerge(target, undefined)).toStrictEqual(target);
    });

    it('should not modify source or target objects directly', () => {
      const target = { a: { b: 1 } };
      const source = { a: { c: 2 } };
      const result = deepMerge(target, source);

      expect(result).toStrictEqual({ a: { b: 1, c: 2 } });
      expect(target).toStrictEqual({ a: { b: 1 } });
      expect(source).toStrictEqual({ a: { c: 2 } });
    });

    it('should merge objects with arrays and other types', () => {
      const target = { a: [1, 2, 3], b: { c: 1 } };
      const source = { a: [4, 5], b: 2 };
      const result = deepMerge(target, source);

      expect(result).toStrictEqual({ a: [4, 5], b: 2 });
    });

    it('should merge deep objects recursively', () => {
      const target = { a: { b: { c: 1 } } };
      const source = { a: { b: { d: 2 } } };
      const result = deepMerge(target, source);

      expect(result).toStrictEqual({ a: { b: { c: 1, d: 2 } } });
    });

    describe('Built-in objects', () => {
      it('should overwrite RegExp objects instead of merging', () => {
        const target = { r: /abc/i };
        const source = { r: /def/g };
        const result = deepMerge(target, source);

        expect(result.r).toBeInstanceOf(RegExp);
        expect(result.r).toStrictEqual(/def/g);
        expect(result.r).toBe(source.r);
      });

      it('should overwrite Map objects instead of merging', () => {
        const map1 = new Map([['a', 1]]);
        const map2 = new Map([['b', 2]]);
        const target = { m: map1 };
        const source = { m: map2 };
        const result = deepMerge(target, source);

        expect(result.m).toBeInstanceOf(Map);
        expect(Array.from(result.m.entries())).toStrictEqual([['b', 2]]);
        expect(result.m).toBe(map2);
      });

      it('should overwrite Set objects instead of merging', () => {
        const set1 = new Set([1, 2]);
        const set2 = new Set([3, 4]);
        const target = { s: set1 };
        const source = { s: set2 };
        const result = deepMerge(target, source);

        expect(result.s).toBeInstanceOf(Set);
        expect(Array.from(result.s)).toStrictEqual([3, 4]);
        expect(result.s).toBe(set2);
      });

      describe('Date objects', () => {
        it('should overwrite Date objects instead of merging', () => {
          const date1 = new Date('2020-01-01T00:00:00Z');
          const date2 = new Date('2021-01-01T00:00:00Z');
          const target = { a: date1 };
          const source = { a: date2 };
          const result = deepMerge(target, source);

          expect(result.a).toBeInstanceOf(Date);
          expect(result.a).toStrictEqual(date2);
          expect(result.a).toBe(date2);
        });

        it('should handle Date in nested objects', () => {
          const date1 = new Date('2020-01-01T00:00:00Z');
          const date2 = new Date('2021-01-01T00:00:00Z');
          const target = { nested: { d: date1 } };
          const source = { nested: { d: date2 } };
          const result = deepMerge(target, source);

          expect(result.nested.d).toBeInstanceOf(Date);
          expect(result.nested.d).toStrictEqual(date2);
          expect(result.nested.d).toBe(date2);
        });

        it('should return the source Date reference when both are Date objects with the same value', () => {
          const date = '2022-05-05T12:00:00Z';
          const target = { a: new Date(date) };
          const source = { a: new Date(date) };
          const result = deepMerge(target, source);

          expect(result.a).toBe(source.a);
        });

        it('should overwrite Date object with primitive value', () => {
          const date = new Date('2020-01-01T00:00:00Z');
          const target = { a: date };
          const source = { a: '2021-01-01' };
          const result = deepMerge(target, source);

          expect(result).toStrictEqual({ a: '2021-01-01' });
        });

        it('should overwrite primitive value with Date object', () => {
          const date = new Date('2020-01-01T00:00:00Z');
          const target = { a: '2021-01-01' };
          const source = { a: date };
          const result = deepMerge(target, source);

          expect(result).toStrictEqual({ a: date });
          expect(result.a).toBe(date);
        });
      });
    });
  });
});
