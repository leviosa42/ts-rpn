// @ts-types="@types/react"
import { FC } from 'react';

import { Key, KeyAction, KeyConfig } from './Key.tsx';
import * as KEYS from './KEYS.ts';
import { State } from '../index.tsx';

export type Props = {
  dispatch: (action: KeyAction) => void;
  state: State;
};

export const System: FC<Props> = ({ dispatch, state }: Props) => {
  return (
    <div className='system'>
      {KEYS.SYSTEM.map((kc) => {
        if (/SHIFT|ALPHA/.test(kc.normal.label)) {
          return (
            <Key
              key={kc.normal.label}
              keyConfig={kc}
              dispatch={dispatch}
              modifiers={state.modifiers}
            />
          );
        }
        return <Key key={kc.normal.label} keyConfig={kc} dispatch={dispatch} modifiers={state.modifiers} />;
      })}
    </div>
  );
};

export const Extended: FC<Props> = ({ dispatch, state }: Props) => {
  return (
    <div className='extend'>
      {KEYS.EXTENDED.map((kc) => (
        <Key key={kc.normal.label} keyConfig={kc} dispatch={dispatch} modifiers={state.modifiers} />
      ))}
    </div>
  );
};

export const Arrow: FC<Props> = ({ dispatch, state }: Props) => {
  return (
    <div className='arrow'>
      {KEYS.ARROW.map((kc) => (
        <Key key={kc.normal.label} keyConfig={kc} dispatch={dispatch} modifiers={state.modifiers} />
      ))}
    </div>
  );
};

export const Basic: FC<Props> = ({ dispatch, state }: Props) => {
  return (
    <div className='basic'>
      {KEYS.BASIC.map((kc) => (
        <Key key={kc.normal.label} keyConfig={kc} dispatch={dispatch} modifiers={state.modifiers} />
      ))}
    </div>
  );
};

export const Constant: FC<Props> = ({ dispatch, state }: Props) => {
  return (
    <div className='constant'>
      {KEYS.CONSTANTS.map((kc) => (
        <Key key={kc.normal.label} keyConfig={kc} dispatch={dispatch} modifiers={state.modifiers} />
      ))}
    </div>
  );
};

export const Function: FC<Props> = ({ dispatch, state }: Props) => {
  return (
    <div className='function'>
      {KEYS.FUNCTIONS.map((kc) => (
        <Key key={kc.normal.label} keyConfig={kc} dispatch={dispatch} modifiers={state.modifiers} />
      ))}
    </div>
  );
};

export const Keypad: FC<Props> = ({ dispatch, state }: Props) => {
  return (
    <div className='keypad'>
      <System dispatch={dispatch} state={state} />
      <Extended dispatch={dispatch} state={state} />
      <Arrow dispatch={dispatch} state={state} />
      {state.keypad_mode === 'normal'
        ? <Basic dispatch={dispatch} state={state} />
        : state.keypad_mode === 'constant'
        ? <Constant dispatch={dispatch} state={state} />
        : state.keypad_mode === 'function'
        ? <Function dispatch={dispatch} state={state} />
        : null}
    </div>
  );
};
