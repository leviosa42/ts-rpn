import { Token } from './types.d.ts';

export class RPNError extends Error {
  constructor(message: string, {
    token,
    expression,
    queue,
    stack,
  }: {
    token?: Token;
    expression?: string;
    queue?: Token[];
    stack?: Token[];
  } = {}) {
    super(message);
  }
}
