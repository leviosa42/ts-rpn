import { RPNError } from './error.ts';
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
            throw new RPNError(
              `Not enough arguments for operator ${token.data} that requires ${token.arity} arguments`,
              {
                token,
                queue,
                stack,
              },
            );
          }
          args.push(arg);
        }
        args = args.reverse();
        stack.push(token.execute(...args));
        break;
      }
      case 'unknown':
        throw new RPNError(`Unknown token: ${token.data}`, { token });
      default: {
        throw new RPNError(`Invalid token`, { token });
      }
    }
  }
  return stack;
}
