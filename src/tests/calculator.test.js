const calc = require('../calculator.js');

describe('Calculator - basic and extended operations with edge cases', () => {
  test('module exports functions', () => {
    expect(typeof calc.add).toBe('function');
    expect(typeof calc.subtract).toBe('function');
    expect(typeof calc.multiply).toBe('function');
    expect(typeof calc.divide).toBe('function');
    expect(typeof calc.modulo).toBe('function');
    expect(typeof calc.power).toBe('function');
    expect(typeof calc.squareRoot).toBe('function');
  });

  // Examples from provided image (basic)
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

  // Extended operations tests (from image)
  test('modulo: 5 % 2 = 1', () => {
    expect(calc.modulo(5, 2)).toBe(1);
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(calc.power(2, 3)).toBe(8);
  });

  test('squareRoot: sqrt(16) = 4', () => {
    expect(calc.squareRoot(16)).toBe(4);
  });

  // Edge cases & additional checks
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

  test('modulo by zero throws RangeError', () => {
    expect(() => calc.modulo(5, 0)).toThrow(RangeError);
  });

  test('squareRoot of negative number throws RangeError', () => {
    expect(() => calc.squareRoot(-9)).toThrow(RangeError);
  });

  test('power with large exponents', () => {
    expect(calc.power(2, 10)).toBe(1024);
  });

  test('modulo with negative numbers follows JS % semantics', () => {
    expect(calc.modulo(-5, 2)).toBe(-1);
    expect(calc.modulo(5, -2)).toBe(1);
  });

  test('divide produces float when necessary', () => {
    expect(calc.divide(7, 2)).toBeCloseTo(3.5);
  });
});
