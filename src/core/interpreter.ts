import { Operand, Queue, Stack } from './types.d.ts';

export function interpret(
  queue: Queue,
  // options: Record<string, unknown> = {},
): Stack {
  const stack: Stack = [];
  for (const token of queue) {
    switch (token.type) {
      case 'operand': {
        stack.push(token);
        break;
      }
      case 'operator': {
        let args: Operand[] = [];
        for (let i = 0; i < token.arity; i++) {
          const arg = stack.pop();
          if (arg === undefined) {
            throw new Error('Not enough operands');
          }
          args.push(arg);
        }
        args = args.reverse();
        stack.push(token.execute(...args));
        break;
      }
      case 'unknown':
        throw new Error(`Unknown token: ${token.data}`);
      default: {
        throw new Error(`Invalid token: ${token}`);
      }
    }
  }
  return stack;
}
