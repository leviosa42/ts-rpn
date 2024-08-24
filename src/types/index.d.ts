export declare type Operator = '+' | '-' | '*' | '/' | '%' | '^';

export declare type Operand = number;

export declare type Token = Operand | Operator;

export declare type Stack = Operand[];

export declare type Queue = Token[];

export declare type Expression = string;
