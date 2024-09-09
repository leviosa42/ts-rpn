// @ts-types="@types/react"
import React, { useEffect, useReducer, useState } from 'react';
// @ts-types="@types/react-dom/client"
import { createRoot } from 'react-dom/client';

import * as rpn from './core/index.ts';

import './styles/index.css';
import { KeyAction } from './components/Key.tsx';
import { Keypad } from './components/Keypad.tsx';
import { Screen } from './components/Screen.tsx';

const Spacer = () => <div className='spacer' />;

export type State = {
  expression: string;
  result: string;
  modifiers: {
    shift: 'inactive' | 'active' | 'locked';
    alpha: 'inactive' | 'active' | 'locked';
  };
  message: string;
  cursorPosition: number;
  keypad_mode: 'normal' | 'constant' | 'function';
};

export const reducer: React.Reducer<State, KeyAction> = (state, action) => {
  const updateByExpression = (expression: string) => {
    try {
      const s = rpn.interpret(rpn.parse(expression));
      if (s.length === 0) {
        return { ...state, expression, result: '', message: '' };
      }
      return { ...state, expression, result: `[ ${s.map((t) => t.value).join(' ')} ]`, message: s[0].value.toString() };
    } catch (e) {
      return { ...state, expression, message: `ERR: ${e.message}` };
    }
  };
  // if modifier is 'active' and the key is pressed, the modifier should be 'inactive' and the key should be processed
  if (action.type !== 'modifier') {
    if (state.modifiers.shift === 'active') {
      return reducer({ ...state, modifiers: { ...state.modifiers, shift: 'inactive' } }, action);
    }
    if (state.modifiers.alpha === 'active') {
      return reducer({ ...state, modifiers: { ...state.modifiers, alpha: 'inactive' } }, action);
    }
  }

  switch (action.type) {
    case 'insert': {
      if (typeof action.payload !== 'string') {
        console.error('Invalid payload', action.payload);
        throw new Error('Invalid payload');
      }
      const updated = updateByExpression(
        state.expression.slice(0, state.cursorPosition) + action.payload + state.expression.slice(state.cursorPosition),
      );
      return reducer(updated, { type: 'cursor.move', payload: action.payload.length });
    }
    case 'delete': {
      if (state.cursorPosition === 0) {
        return state;
      }
      const updated = updateByExpression(
        state.expression.slice(0, state.cursorPosition - 1) + state.expression.slice(state.cursorPosition),
      );
      return reducer(updated, { type: 'cursor.move', payload: -1 });
    }
    case 'clear':
      return updateByExpression('');
    case 'enter':
      return reducer(updateByExpression(state.expression + ' '), { type: 'cursor.move', payload: 1 });
    case 'modifier': {
      const toggle = (state: 'inactive' | 'active' | 'locked') => {
        switch (state) {
          case 'inactive':
            return 'active';
          case 'active':
            return 'locked';
          case 'locked':
            return 'inactive';
        }
      };
      return {
        ...state,
        modifiers: {
          ...state.modifiers,
          [action.payload as keyof State['modifiers']]: toggle(
            state.modifiers[action.payload as keyof State['modifiers']],
          ),
        },
      };
    }
    case 'cursor.move': {
      if (typeof action.payload === 'number') {
        const cursorPosition = Math.max(0, Math.min(state.expression.length, state.cursorPosition + action.payload));
        return { ...state, cursorPosition };
      } else {
        console.error('Invalid payload', action.payload);
        throw new Error();
      }
    }
    case 'keypad_mode': {
      // 現在と同じkeypad_modeの場合はnormalに戻す
      if (state.keypad_mode === action.payload) {
        return { ...state, keypad_mode: 'normal' };
      } else if (action.payload === 'constant' || action.payload === 'function') {
        return { ...state, keypad_mode: action.payload };
      } else {
        console.error('Invalid payload', action.payload);
        throw new Error();
      }
    }
    case 'noop':
      return state;
    default:
      console.error('Unknown action', action);
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    expression: '',
    result: '',
    modifiers: { shift: 'inactive', alpha: 'inactive' },
    message: '',
    cursorPosition: 0,
    keypad_mode: 'normal',
  });

  return (
    <div className='app'>
      <Screen state={state} dispatch={dispatch} />
      <Keypad state={state} dispatch={dispatch} />
    </div>
  );
};

createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
