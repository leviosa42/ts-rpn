import type { Operand } from '../types/index.d.ts';

// lexical.test.ts
import * as lexical from '../core/parser.ts';
import { assertEquals } from 'https://deno.land/std/assert/assert_equals.ts';

Deno.test('[lexical] tokenize() - Operand.number', () => {
  const actual = lexical.tokenize(['1', '1.2', '.3', '4.']);
  const expected: Operand[] = [
    { type: 'operand', category: 'number', data: '1', value: 1 },
    { type: 'operand', category: 'number', data: '1.2', value: 1.2 },
    { type: 'operand', category: 'number', data: '.3', value: 0.3 },
    { type: 'operand', category: 'number', data: '4.', value: 4 },
  ];
  assertEquals(actual, expected);
});

Deno.test('[lexical] tokenize() - Operand.constant', () => {
  const actual = lexical.tokenize(['C_PI', 'C_E', 'C_g']);
  const expected: Operand[] = [
    { type: 'operand', category: 'constant', data: 'C_PI', value: Math.PI },
    { type: 'operand', category: 'constant', data: 'C_E', value: Math.E },
    { type: 'operand', category: 'constant', data: 'C_g', value: 9.8 },
  ];
  assertEquals(actual, expected);
});
