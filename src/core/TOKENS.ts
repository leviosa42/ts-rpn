import { Operand, Operator } from './types.d.ts';

export const SYMBOLS: Record<string, Omit<Operator, 'data'>> = {
  '+': {
    type: 'operator',
    category: 'symbol',
    name: 'addition',
    arity: 2,
    execute: (lhs, rhs) => {
      const result = lhs.value + rhs.value;
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: lhs.value + rhs.value,
      } as Operand;
    },
  },
  '-': {
    type: 'operator',
    category: 'symbol',
    name: 'subtraction',
    arity: 2,
    execute: (lhs, rhs) => {
      const result = lhs.value - rhs.value;
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: lhs.value - rhs.value,
      } as Operand;
    },
  },
  '*': {
    type: 'operator',
    category: 'symbol',
    name: 'multiplication',
    arity: 2,
    execute: (lhs, rhs) => {
      const result = lhs.value * rhs.value;
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: lhs.value * rhs.value,
      } as Operand;
    },
  },
  '/': {
    type: 'operator',
    category: 'symbol',
    name: 'division',
    arity: 2,
    execute: (lhs, rhs) => {
      const result = lhs.value / rhs.value;
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: lhs.value / rhs.value,
      } as Operand;
    },
  },
  '%': {
    type: 'operator',
    category: 'symbol',
    name: 'modulo',
    arity: 2,
    execute: (lhs, rhs) => {
      const result = lhs.value % rhs.value;
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: lhs.value % rhs.value,
      } as Operand;
    },
  },
  '^': {
    type: 'operator',
    category: 'symbol',
    name: 'exponentiation',
    arity: 2,
    execute: (lhs, rhs) => {
      const result = lhs.value ** rhs.value;
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: lhs.value ** rhs.value,
      } as Operand;
    },
  },
};

export const FUNCTIONS: Record<string, Omit<Operator, 'data'>> = {
  'sin': {
    type: 'operator',
    category: 'function',
    name: 'sine',
    arity: 1,
    execute: (operand: Operand) => {
      const result = Math.sin(operand.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
  'cos': {
    type: 'operator',
    category: 'function',
    name: 'cosine',
    arity: 1,
    execute: (operand: Operand) => {
      const result = Math.cos(operand.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
  'tan': {
    type: 'operator',
    category: 'function',
    name: 'tangent',
    arity: 1,
    execute: (operand: Operand) => {
      const result = Math.tan(operand.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
  'asin': {
    type: 'operator',
    category: 'function',
    name: 'arcsine',
    arity: 1,
    execute: (operand: Operand) => {
      const result = Math.asin(operand.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
  'acos': {
    type: 'operator',
    category: 'function',
    name: 'arccosine',
    arity: 1,
    execute: (operand: Operand) => {
      const result = Math.acos(operand.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
  'atan': {
    type: 'operator',
    category: 'function',
    name: 'arctangent',
    arity: 1,
    execute: (operand: Operand) => {
      const result = Math.atan(operand.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
  'sinh': {
    type: 'operator',
    category: 'function',
    name: 'hyperbolic sine',
    arity: 1,
    execute: (operand: Operand) => {
      const result = Math.sinh(operand.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
  'cosh': {
    type: 'operator',
    category: 'function',
    name: 'hyperbolic cosine',
    arity: 1,
    execute: (operand: Operand) => {
      const result = Math.cosh(operand.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
  'tanh': {
    type: 'operator',
    category: 'function',
    name: 'hyperbolic tangent',
    arity: 1,
    execute: (operand: Operand) => {
      const result = Math.tanh(operand.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
  'sqrt': {
    type: 'operator',
    category: 'function',
    name: 'square root',
    arity: 1,
    execute: (operand: Operand) => {
      const result = Math.sqrt(operand.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
  'log2': {
    type: 'operator',
    category: 'function',
    name: 'logarithm base 2',
    arity: 1,
    execute: (operand: Operand) => {
      const result = Math.log2(operand.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
  'log10': {
    type: 'operator',
    category: 'function',
    name: 'logarithm base 10',
    arity: 1,
    execute: (operand: Operand) => {
      const result = Math.log10(operand.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
  'ln': {
    type: 'operator',
    category: 'function',
    name: 'natural logarithm',
    arity: 1,
    execute: (operand: Operand) => {
      const result = Math.log(operand.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
  'min': {
    type: 'operator',
    category: 'function',
    name: 'minimum',
    arity: 2,
    execute: (lhs, rhs) => {
      const result = Math.min(lhs.value, rhs.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
  'max': {
    type: 'operator',
    category: 'function',
    name: 'maximum',
    arity: 2,
    execute: (lhs, rhs) => {
      const result = Math.max(lhs.value, rhs.value);
      return {
        type: 'operand',
        category: 'number',
        data: result.toString(),
        value: result,
      } as Operand;
    },
  },
};

export const CONSTANTS: Record<string, Omit<Operand, 'data'>> = {
  C_PI: {
    type: 'operand',
    category: 'constant',
    value: Math.PI,
  },
  C_E: {
    type: 'operand',
    category: 'constant',
    value: Math.E,
  },
  C_g: {
    type: 'operand',
    category: 'constant',
    value: 9.81,
  },
  C_c: {
    type: 'operand',
    category: 'constant',
    value: 299_792_458,
  },
};
