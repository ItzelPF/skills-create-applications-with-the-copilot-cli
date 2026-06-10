#!/usr/bin/env node
"use strict";

/**
 * Calculator - supports basic operations:
 *  - addition (add, +)
 *  - subtraction (sub, -, subtract)
 *  - multiplication (mul, *, multiply)
 *  - division (div, /, divide)
 *  - modulo (mod, %)
 *  - exponentiation / power (pow, ^)
 *  - square root (sqrt)
 *
 * Exports: add(a, b), subtract(a, b), multiply(a, b), divide(a, b),
 *          modulo(a, b), power(base, exponent), squareRoot(n)
 *
 * CLI usage examples:
 *   node src/calculator.js add 2 3    # outputs 5
 *   node src/calculator.js sub 5 2    # outputs 3
 *   node src/calculator.js mul 4 6    # outputs 24
 *   node src/calculator.js div 8 2    # outputs 4
 *   node src/calculator.js mod 10 3   # outputs 1
 *   node src/calculator.js pow 2 3    # outputs 8
 *   node src/calculator.js sqrt 9     # outputs 3
 */

function toNumber(value) {
  const n = Number(value);
  if (Number.isNaN(n)) throw new TypeError(`Invalid number: ${value}`);
  return n;
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new RangeError('Division by zero');
  }
  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new RangeError('Modulo by zero');
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new RangeError('Square root of negative number');
  }
  return Math.sqrt(n);
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

// CLI handling when run directly
if (require.main === module) {
  const usage = `Usage: node src/calculator.js <op> <a> [<b>]\n
Supported operations:\n  add | +    -> addition (requires 2 operands)\n  sub | -    -> subtraction (requires 2 operands)\n  mul | *    -> multiplication (requires 2 operands)\n  div | /    -> division (requires 2 operands)\n  mod | %    -> modulo (requires 2 operands)\n  pow | ^    -> exponentiation (requires 2 operands)\n  sqrt       -> square root (requires 1 operand)\n\nExamples:\n  node src/calculator.js add 2 3\n  node src/calculator.js sqrt 9`;

  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error(usage);
    process.exit(2);
  }

  const op = args[0];

  // operations that require two operands
  const twoArgOps = new Set(['add','+','sub','subtract','-','mul','multiply','*','div','divide','/','mod','%','pow','^']);
  // operations that require one operand
  const oneArgOps = new Set(['sqrt','√']);

  try {
    let result;

    if (twoArgOps.has(op)) {
      if (args.length < 3) {
        console.error(`Operation ${op} requires two operands.\n${usage}`);
        process.exit(2);
      }
      const a = toNumber(args[1]);
      const b = toNumber(args[2]);

      switch (op) {
        case 'add':
        case '+':
          result = add(a, b);
          break;
        case 'sub':
        case 'subtract':
        case '-':
          result = subtract(a, b);
          break;
        case 'mul':
        case 'multiply':
        case '*':
          result = multiply(a, b);
          break;
        case 'div':
        case 'divide':
        case '/':
          result = divide(a, b);
          break;
        case 'mod':
        case '%':
          result = modulo(a, b);
          break;
        case 'pow':
        case '^':
          result = power(a, b);
          break;
        default:
          console.error(`Unknown operation: ${op}\n${usage}`);
          process.exit(4);
      }
    } else if (oneArgOps.has(op)) {
      if (args.length < 2) {
        console.error(`Operation ${op} requires one operand.\n${usage}`);
        process.exit(2);
      }
      const n = toNumber(args[1]);
      switch (op) {
        case 'sqrt':
        case '√':
          result = squareRoot(n);
          break;
        default:
          console.error(`Unknown operation: ${op}\n${usage}`);
          process.exit(4);
      }
    } else {
      console.error(`Unknown operation: ${op}\n${usage}`);
      process.exit(4);
    }

    // Print result
    if (Number.isInteger(result)) console.log(result);
    else console.log(result);
  } catch (err) {
    if (err instanceof RangeError && /zero/i.test(err.message)) {
      console.error('Error: Division or modulo by zero is not allowed');
      process.exit(5);
    }
    if (err instanceof RangeError && /square root/i.test(err.message)) {
      console.error('Error: Square root of negative numbers is not allowed');
      process.exit(6);
    }
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}
