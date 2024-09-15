// @ts-types="@types/react"
import { FC } from 'react';
import type { State } from '../index.tsx';
import type { KeyAction, Props } from './Key.tsx';
import * as rpn from '../../core/mod.ts';

export const Verbose = ({ dispatch, state }: {
  dispatch: (action: KeyAction) => void;
  state: State;
}) => {
  try {
    const expr = state.expression;
    const queue = rpn.parse(expr);
    const stack = rpn.interpret(queue);
    return (
      <div className='verbose'>
        <code>
          <pre>Expression:</pre>
          <pre>{expr}</pre>

          <pre>Queue:</pre>
          <pre>{JSON.stringify(queue, null, 2)}</pre>

          <pre>Stack:</pre>
          <pre>{JSON.stringify(stack, null, 2)}</pre>
        </code>
      </div>
    );
  } catch (e) {
    console.error(e);
    return (
      <div className='verbose'>
        <code>
          <pre>{e.message}</pre>
        </code>
      </div>
    );
  }
};

export const Screen: React.FC<{ state: State; dispatch: React.Dispatch<KeyAction> }> = ({ state, dispatch }) => {
  return (
    <div className='screen'>
      <div className='input'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type='text'
            className='tokens'
            placeholder='式を入力'
            value={((expr, cpos) => {
              const CURSOR_CHAR = '¦'; // U+00A6, BROKEN BAR
              // const CURSOR_CHAR = '∣'; // U+2223, DIVIDES
              return expr.slice(0, cpos) + CURSOR_CHAR + expr.slice(cpos);
            })(state.expression, state.cursorPosition)}
            onChange={(e) => {
              dispatch({ type: 'clear', payload: null });
              dispatch({ type: 'insert', payload: e.target.value });
            }}
            // autoFocus
          />
        </form>
      </div>
      <div className='result'>
        <input
          type='text'
          className='tokens'
          value={state.result}
          readOnly
        />
        <div className='message'>
          <input
            type='text'
            className={`text ${state.message.startsWith('ERR') ? 'error' : ''}`}
            value={state.message}
            readOnly
          />
        </div>
      </div>
      <Verbose dispatch={dispatch} state={state} />
    </div>
  );
};
