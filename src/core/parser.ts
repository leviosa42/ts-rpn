import { Operand, Operator, Token, Unknown } from './types.d.ts';

import { CONSTANTS, FUNCTIONS, SYMBOLS } from './TOKENS.ts';

export function scan(expression: string): string[] {
  return expression.trim().split(/\s+/).filter((e) => e.length > 0);
}

export function tokenize(scanned: string[]): Token[] {
  return scanned.map((e: string) => {
    if (/^\d*\.?\d$/.test(e)) {
      // operand.number
      // ex. 123, 3.14, .5, 2.
      return {
        type: 'operand',
        category: 'number',
        data: e,
        value: parseFloat(e),
      } as Operand;
    }
    if (Object.keys(CONSTANTS).includes(e)) {
      // operand.constant
      // ex. C_PI, C_E, C_g
      return {
        ...CONSTANTS[e],
        data: e,
      } as Operand;
    }
    if (Object.keys(SYMBOLS).includes(e)) {
      // operator
      // ex. +, -, *, /, %, ^
      return {
        ...SYMBOLS[e],
        data: e,
      } as Operator;
    }
    if (Object.keys(FUNCTIONS).includes(e)) {
      // operator
      // ex. sin, cos, tan, log, ln, sqrt
      return {
        type: 'operator',
        name: FUNCTIONS[e].name,
        data: e,
        arity: FUNCTIONS[e].arity,
        execute: FUNCTIONS[e].execute,
      } as Operator;
    }
    return {
      type: 'unknown',
      data: e,
    } as Unknown;
  });
}

export function parse(expression: string): Token[] {
  return tokenize(scan(expression));
}
