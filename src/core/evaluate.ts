import { scan, tokenize } from './parser.ts';
import { interpret } from './interpreter.ts';

export function evaluate(expression: string) {
  const scanned = scan(expression);
  const queue = tokenize(scanned);
  const stack = interpret(queue);
  return stack;
}
