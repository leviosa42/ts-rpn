import { buildKey } from './Key.tsx';
import type { KeyConfig } from './Key.tsx';

export const BASIC: KeyConfig[] = [
  //
  buildKey({ normal: { label: '7', action: { type: 'insert', payload: '7' } } }),
  buildKey({ normal: { label: '8', action: { type: 'insert', payload: '8' } } }),
  buildKey({ normal: { label: '9', action: { type: 'insert', payload: '9' } } }),
  buildKey({ normal: { label: 'DEL', action: { type: 'delete', payload: null } }, color: 'warning' }),
  buildKey({ normal: { label: 'AC', action: { type: 'clear', payload: null } }, color: 'danger' }),
  //
  buildKey({ normal: { label: '4', action: { type: 'insert', payload: '4' } } }),
  buildKey({ normal: { label: '5', action: { type: 'insert', payload: '5' } } }),
  buildKey({ normal: { label: '6', action: { type: 'insert', payload: '6' } } }),
  buildKey({ normal: { label: '*', action: { type: 'insert', payload: '*' } } }),
  buildKey({ normal: { label: '/', action: { type: 'insert', payload: '/' } } }),
  //
  buildKey({ normal: { label: '1', action: { type: 'insert', payload: '1' } } }),
  buildKey({ normal: { label: '2', action: { type: 'insert', payload: '2' } } }),
  buildKey({ normal: { label: '3', action: { type: 'insert', payload: '3' } } }),
  buildKey({ normal: { label: '+', action: { type: 'insert', payload: '+' } } }),
  buildKey({ normal: { label: '-', action: { type: 'insert', payload: '-' } } }),
  //
  buildKey({ normal: { label: '0', action: { type: 'insert', payload: '0' } } }),
  buildKey({
    normal: { label: '.', action: { type: 'insert', payload: '.' } },
    shift: { label: 'π', action: { type: 'insert', payload: 'C_PI' } },
    alpha: { label: 'e', action: { type: 'insert', payload: 'C_E' } },
  }),
  buildKey({ normal: { label: '^', action: { type: 'insert', payload: '^' } } }),
  buildKey({ normal: { label: '%', action: { type: 'insert', payload: '%' } } }),
  buildKey({ normal: { label: 'ENT', action: { type: 'enter', payload: ' ' } }, color: 'primary' }),
];

export const SYSTEM: KeyConfig[] = [
  buildKey({ normal: { label: 'SHIFT', action: { type: 'modifier', payload: 'shift' } }, color: 'secondary' }),
  buildKey({ normal: { label: 'ALPHA', action: { type: 'modifier', payload: 'alpha' } }, color: 'tertiary' }),
  buildKey({ normal: { label: 'MENU', action: { type: 'noop', payload: null } }, color: 'normal', enabled: false }),
  buildKey({ normal: { label: 'MODE', action: { type: 'noop', payload: null } }, color: 'normal', enabled: false }),
] as const;

export const EXTENDED: KeyConfig[] = [
  //
  buildKey({
    normal: { label: 'CNST', action: { type: 'keypad_mode', payload: 'constant' } },
    enabled: true,
  }),
  buildKey({
    normal: { label: 'FUNC', action: { type: 'keypad_mode', payload: 'function' } },
    enabled: true,
  }),
  buildKey({
    normal: { label: 'sin', action: { type: 'insert', payload: 'sin' } },
    shift: { label: 'asin', action: { type: 'insert', payload: 'asin' } },
    alpha: { label: 'sinh', action: { type: 'insert', payload: 'sinh' } },
  }),
  buildKey({
    normal: { label: 'cos', action: { type: 'insert', payload: 'cos' } },
    shift: { label: 'acos', action: { type: 'insert', payload: 'acos' } },
    alpha: { label: 'cosh', action: { type: 'insert', payload: 'cosh' } },
  }),
  buildKey({
    normal: { label: 'tan', action: { type: 'insert', payload: 'tan' } },
    shift: { label: 'atan', action: { type: 'insert', payload: 'atan' } },
    alpha: { label: 'tanh', action: { type: 'insert', payload: 'tanh' } },
  }),
  //
] as const;

export const ARROW: KeyConfig[] = [
  buildKey({
    normal: { label: '←', action: { type: 'cursor.move', payload: -1 } },
    shift: { label: 'home', action: { type: 'cursor.move', payload: -Infinity } },
    color: 'invert',
  }),
  buildKey({
    normal: { label: '→', action: { type: 'cursor.move', payload: 1 } },
    shift: { label: 'end', action: { type: 'cursor.move', payload: Infinity } },
    color: 'invert',
  }),
] as const;

export const CONSTANTS: KeyConfig[] = [
  // physical constants
  buildKey({ normal: { label: 'c', action: { type: 'insert', payload: 'C_c' } } }),
  buildKey({ normal: { label: 'g', action: { type: 'insert', payload: 'C_g' } } }),
] as const;

export const FUNCTIONS: KeyConfig[] = [
  // trigonometric functions
  buildKey({ normal: { label: 'sin', action: { type: 'insert', payload: 'sin' } } }),
  buildKey({ normal: { label: 'cos', action: { type: 'insert', payload: 'cos' } } }),
  buildKey({ normal: { label: 'tan', action: { type: 'insert', payload: 'tan' } } }),
  buildKey({ normal: { label: 'asin', action: { type: 'insert', payload: 'asin' } } }),
  buildKey({ normal: { label: 'acos', action: { type: 'insert', payload: 'acos' } } }),
  buildKey({ normal: { label: 'atan', action: { type: 'insert', payload: 'atan' } } }),
  buildKey({ normal: { label: 'sinh', action: { type: 'insert', payload: 'sinh' } } }),
  buildKey({ normal: { label: 'cosh', action: { type: 'insert', payload: 'cosh' } } }),
  buildKey({ normal: { label: 'tanh', action: { type: 'insert', payload: 'tanh' } } }),
  // sqrt
  buildKey({ normal: { label: 'sqrt', action: { type: 'insert', payload: 'sqrt' } } }),
  // logarithmic functions
  buildKey({ normal: { label: 'ln', action: { type: 'insert', payload: 'ln' } } }),
  buildKey({ normal: { label: 'log2', action: { type: 'insert', payload: 'log2' } } }),
  buildKey({ normal: { label: 'log10', action: { type: 'insert', payload: 'log10' } } }),
  // min/max
  buildKey({ normal: { label: 'min', action: { type: 'insert', payload: 'min' } } }),
  buildKey({ normal: { label: 'max', action: { type: 'insert', payload: 'max' } } }),
  // exponential functions
] as const;
