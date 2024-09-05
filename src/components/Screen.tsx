import type { State } from '../index.tsx';
import type { KeyAction } from './Key.tsx';

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
    </div>
  );
};
