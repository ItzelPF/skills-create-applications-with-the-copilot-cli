#!/usr/bin/env node
"use strict";

/**
 * Calculator - supports four basic operations:
 *  - addition (add, +)
 *  - subtraction (sub, -, subtract)
 *  - multiplication (mul, *, multiply)
 *  - division (div, /, divide)
 *
 * Exports: add(a, b), subtract(a, b), multiply(a, b), divide(a, b)
 * CLI usage examples:
 *   node src/calculator.js add 2 3    # outputs 5
 *   node src/calculator.js sub 5 2    # outputs 3
 *   node src/calculator.js mul 4 6    # outputs 24
 *   node src/calculator.js div 8 2    # outputs 4
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

module.exports = { add, subtract, multiply, divide };

// CLI handling when run directly
if (require.main === module) {
  const usage = `Usage: node src/calculator.js <op> <a> <b>\n
Supported operations:\n  add | +    -> addition\n  sub | -    -> subtraction\n  mul | *    -> multiplication\n  div | /    -> division\n\nExamples:\n  node src/calculator.js add 2 3`;

  const args = process.argv.slice(2);
  if (args.length !== 3) {
    console.error(usage);
    process.exit(2);
  }

  const [op, aRaw, bRaw] = args;
  let a, b;

  try {
    a = toNumber(aRaw);
    b = toNumber(bRaw);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(3);
  }

  try {
    let result;
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
      default:
        console.error(`Unknown operation: ${op}\n${usage}`);
        process.exit(4);
    }

    // Print integers without decimal when appropriate
    if (Number.isInteger(result)) console.log(result);
    else console.log(result);
  } catch (err) {
    if (err instanceof RangeError && /zero/.test(err.message)) {
      console.error('Error: Division by zero is not allowed');
      process.exit(5);
    }
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}
