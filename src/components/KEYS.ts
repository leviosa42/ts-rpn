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
    normal: { label: 'CNST', action: { type: 'noop', payload: null } },
    enabled: false,
  }),
  buildKey({
    normal: { label: 'FUNC', action: { type: 'noop', payload: null } },
    enabled: false,
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
