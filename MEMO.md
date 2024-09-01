```typescript
// Reverse Polish Notation

type Operator = '+' | '-' | '*' | '/' | '^';
type Function = 'sin' | 'cos' | 'tan' | 'log' | 'exp' | 'sqrt';
type Token = {
  type: 'number' | 'identifier' | 'operator' | 'function';
  data: Token['type'] extends 'number' ? number : string;
};

type Queue = Token[];
type Stack = Token[];
```
