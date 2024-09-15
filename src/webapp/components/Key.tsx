// @ts-types="@types/react"
import { FC } from 'react';
import { useSound } from 'use-sound';

const SOUND_ONCLICK = new URL('../public/keyboard_1.mp3', import.meta.url).href;

export type KeyAction = {
  type: 'insert' | 'delete' | 'clear' | 'enter' | 'modifier' | 'noop' | 'keypad_mode' | 'cursor.move';
  payload: string | number | null;
  enabled?: boolean;
};

export type KeyConfig = {
  normal: { label: string; action: KeyAction };
  shift: { label: string; action: KeyAction } | null;
  alpha: { label: string; action: KeyAction } | null;
  color: 'normal' | 'primary' | 'secondary' | 'tertiary' | 'danger' | 'warning' | 'invert';
  enabled: boolean;
};

export type Props = {
  keyConfig: KeyConfig;
  dispatch: (action: KeyAction) => void;
  modifiers: { shift: 'inactive' | 'active' | 'locked'; alpha: 'inactive' | 'active' | 'locked' };
};

export const Key: FC<Props> = ({ keyConfig, dispatch, modifiers }) => {
  const [play] = useSound(SOUND_ONCLICK);

  const classes = ['key', keyConfig.color, keyConfig.enabled ? '' : 'disabled'];
  // shift and alpha are mutually exclusive
  if (keyConfig.normal.label === 'SHIFT') {
    return (
      <button
        className={`${modifiers.shift} ${classes.join(' ')}`}
        onClick={() => {
          play();
          dispatch(keyConfig.normal.action);
        }}
      >
        {keyConfig.normal.label}
      </button>
    );
  }
  if (keyConfig.normal.label === 'ALPHA') {
    return (
      <button
        className={`${modifiers.alpha} ${classes.join(' ')}`}
        onClick={() => {
          play();
          dispatch(keyConfig.normal.action);
        }}
      >
        {keyConfig.normal.label}
      </button>
    );
  }
  const action = (({ shift, alpha }) => {
    if (keyConfig.shift && (shift === 'active' || shift === 'locked')) {
      return keyConfig.shift.action;
    }
    if (keyConfig.alpha && (alpha === 'active' || alpha === 'locked')) {
      return keyConfig.alpha.action;
    }
    return keyConfig.normal.action;
  })(modifiers);
  return (
    <button
      className={classes.join(' ')}
      onClick={keyConfig.enabled
        ? () => {
          play();
          dispatch(action);
        }
        : undefined}
    >
      <div className='shift'>{keyConfig.shift?.label ?? '\u00a0'}</div>
      {keyConfig.normal.label}
      <div className='alpha'>{keyConfig.alpha?.label ?? '\u00a0'}</div>
    </button>
  );
};

export function buildKey(key: Partial<KeyConfig>): KeyConfig {
  return {
    normal: { label: '', action: { type: 'noop', payload: null } },
    shift: null,
    alpha: null,
    color: 'normal',
    enabled: true,
    ...key,
  };
}
