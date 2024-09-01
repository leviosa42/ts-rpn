export interface BaseToken {
  type: string;
  data: string;
}

export interface Operand extends BaseToken {
  type: 'operand';
  category: 'number' | 'constant';
  data: string;
  value: number;
}

export interface Operator extends BaseToken {
  type: 'operator';
  category: 'symbol' | 'function';
  name: string;
  data: string;
  arity: number;
  execute: (...args: Operand[]) => Operand;
}
export interface Unknown extends BaseToken {
  type: 'unknown';
  data: string;
}

export type Token = Operand | Operator | Unknown;

export type Queue = Token[];
export type Stack = Operand[];
