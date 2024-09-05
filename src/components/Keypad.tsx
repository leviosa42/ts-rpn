import { FC } from 'react';

import { Key, KeyAction, KeyConfig } from './Key.tsx';
import * as KEYS from './KEYS.ts';
import { State } from '../index.tsx';

export type Props = {
  dispatch: (action: KeyAction) => void;
  state: State;
};

export const System: FC<Props> = ({ dispatch, state }: Props) => {
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
  </div>;
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

export const Basic: FC<Props> = ({ dispatch, state }: Props) => {
  return (
    <div className='basic'>
      {KEYS.BASIC.map((kc) => (
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
      <Basic dispatch={dispatch} state={state} />
    </div>
  );
};
