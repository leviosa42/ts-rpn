// @ts-types="@types/react"
import React, { useEffect, useReducer, useState } from 'react';
// @ts-types="@types/react-dom/client"
import { createRoot } from 'react-dom/client';

import * as rpn from './core/index.ts';

import './styles/index.css';
import { KeyAction } from './components/Key.tsx';
import { Keypad } from './components/Keypad.tsx';

const Screen: React.FC<{ state: State; dispatch: React.Dispatch<KeyAction> }> = ({ state, dispatch }) => {
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
            value={state.expression}
            onChange={(e) => {
              dispatch({ type: 'clear', payload: null });
              dispatch({ type: 'insert', payload: e.target.value });
            }}
            autoFocus
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
    </div>
  );
};

const Spacer = () => <div className='spacer' />;

export type State = {
  expression: string;
  result: string;
  modifiers: {
    shift: 'inactive' | 'active' | 'locked';
    alpha: 'inactive' | 'active' | 'locked';
  };
  message: string;
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
    case 'insert':
      return updateByExpression(state.expression + action.payload);
    case 'delete':
      return updateByExpression(state.expression.slice(0, -1));
    case 'clear':
      return updateByExpression('');
    case 'enter':
      return updateByExpression(state.expression + ' ');
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
