const calc = require('../calculator.js');

describe('Calculator - basic operations and edge cases', () => {
  test('module exports functions', () => {
    expect(typeof calc.add).toBe('function');
    expect(typeof calc.subtract).toBe('function');
    expect(typeof calc.multiply).toBe('function');
    expect(typeof calc.divide).toBe('function');
  });

  // Examples from provided image
  test('2 + 3 = 5', () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test('10 - 4 = 6', () => {
    expect(calc.subtract(10, 4)).toBe(6);
  });

  test('45 * 2 = 90', () => {
    expect(calc.multiply(45, 2)).toBe(90);
  });

  test('20 / 5 = 4', () => {
    expect(calc.divide(20, 5)).toBe(4);
  });

  // Additional correctness & edge cases
  test('addition with floats: 0.1 + 0.2 ~= 0.3', () => {
    expect(calc.add(0.1, 0.2)).toBeCloseTo(0.3, 10);
  });

  test('multiplying by zero yields zero', () => {
    expect(calc.multiply(12345, 0)).toBe(0);
    expect(calc.multiply(0, 999)).toBe(0);
  });

  test('subtracting negative numbers', () => {
    expect(calc.subtract(-5, -2)).toBe(-3);
    expect(calc.subtract(5, -2)).toBe(7);
  });

  test('large numbers addition', () => {
    expect(calc.add(1e12, 1)).toBe(1000000000001);
  });

  test('division by zero throws RangeError', () => {
    expect(() => calc.divide(1, 0)).toThrow(RangeError);
    expect(() => calc.divide(0, 0)).toThrow(RangeError);
  });

  test('divide produces float when necessary', () => {
    expect(calc.divide(7, 2)).toBeCloseTo(3.5);
  });
});
