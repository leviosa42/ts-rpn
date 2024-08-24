import type { Expression, Operand, Operator, Queue, Stack, Token } from './types/index.d.ts';

/**
 * 与えられた演算子に基づき数値を計算する
 * @param op {Operator}
 * @param operands {Operand[]}
 * @returns {Operand}
 */
export function operate(op: Operator, lhs: Operand, rhs: Operand): Operand {
  switch (op) {
    case '+':
      return lhs + rhs;
    case '-':
      return lhs - rhs;
    case '*':
      return lhs * rhs;
    case '/':
      return lhs / rhs;
    case '%':
      return lhs % rhs;
    case '^':
      return lhs ** rhs;
    default:
      throw new Error(`Unknown operator: ${op}`);
  }
}

export function tokenize(expression: Expression): Token[] {
  return expression.split(' ').map((e: string) => {
    const num = parseFloat(e);
    if (isNaN(num)) {
      return e as Operator;
    } else {
      return num as Operand;
    }
  });
}

export function varidate(expression: Expression): void {
  // count of operators should be one less than count of operands
  const operators = expression.match(/[\+\-\*/%^]/g);
  const operands = expression.match(/\d+/g);
  if (!operators || !operands) {
    throw new Error('Invalid expression');
  }
  if (operators.length !== operands.length - 1) {
    throw new Error(
      `Number of operators (${operators.length}) should be one less than number of operands (${operands.length})`,
    );
  }
}

export function evaluate(expression: Expression, options: Record<string, boolean> = {}): Operand {
  // options.debug && console.debug('Expression:', expression);

  // varidate(expression);
  const queue = tokenize(expression) as Queue;
  const length = queue.length;
  const stack: Stack = [];

  for (let i = queue.length; i--;) {
    const token = queue.shift() as Token;
    if (typeof token === 'number') {
      stack.push(token);
    } else {
      const rhs = stack.pop() as Operand;
      const lhs = stack.pop() as Operand;
      stack.push(operate(token, lhs, rhs));
    }
    if (options.debug) {
      const padding = Array(length - queue.length - stack.length + 1).fill('.').join('.');
      console.debug(
        [...stack, padding, ...queue].join(' '),
      );
    }
  }

  return stack.pop() as Operand;
}
