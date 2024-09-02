// @ts-types="@types/react"
import React, { useEffect, useState } from 'react';
// @ts-types="@types/react-dom/client"
import { createRoot } from 'react-dom/client';

import * as rpn from './core/index.ts';

import './styles/index.css';

const Screen = ({
  expression,
  setExpression,
  queue,
  setQueue,
  stack,
  setStack,
  message,
  setMessage,
}: {
  expression: string;
  setExpression: (expression: string) => void;
  queue: rpn.Queue;
  setQueue: (queue: rpn.Queue) => void;
  stack: rpn.Stack;
  setStack: (stack: rpn.Stack) => void;
  message: string;
  setMessage: (message: string) => void;
}) => {
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
            value={expression}
            autoFocus
            onChange={(e) => {
              setExpression(e.target.value);
            }}
          />
        </form>
      </div>
      <div className='result'>
        <input
          type='text'
          className='tokens'
          value={`[ ${stack.map((e) => e.value).join(' ')} ]`}
          readOnly
        />
        <div className='message error'>
          <input
            type='text'
            className={`text ${message.startsWith('ERR') ? 'error' : ''}`}
            value={message}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

const Keypad = ({
  expression,
  setExpression,
  queue,
  setQueue,
  stack,
  setStack,
}: {
  expression: string;
  setExpression: (expression: string) => void;
  queue: rpn.Queue;
  setQueue: (queue: rpn.Queue) => void;
  stack: rpn.Stack;
  setStack: (stack: rpn.Stack) => void;
}) => {
  /* EXTENDED KEYPAD
    _   _  sqrt min max
    g   _  log2 log10 ln
    π   e  sin cos tan
  */
  const KEYS_EXTENDED = [
    { label: ' ', onClick: () => {} },
    { label: ' ', onClick: () => {} },
    { label: 'sqrt', onClick: () => setExpression(expression + 'sqrt') },
    { label: 'min', onClick: () => setExpression(expression + 'min') },
    { label: 'max', onClick: () => setExpression(expression + 'max') },
    { label: 'g', onClick: () => setExpression(expression + 'C_g') },
    { label: ' ', onClick: () => {} },
    { label: 'log2', onClick: () => setExpression(expression + 'log2') },
    { label: 'log10', onClick: () => setExpression(expression + 'log10') },
    { label: 'ln', onClick: () => setExpression(expression + 'ln') },
    { label: 'π', onClick: () => setExpression(expression + 'C_PI') },
    { label: 'e', onClick: () => setExpression(expression + 'C_E') },
    { label: 'sin', onClick: () => setExpression(expression + 'sin') },
    { label: 'cos', onClick: () => setExpression(expression + 'cos') },
    { label: 'tan', onClick: () => setExpression(expression + 'tan') },
  ];

  /* BASIC KEYPAD
    7    8    9 DEL AC
    4    5    6 *   /
    1    2    3 +   -
    0    .    ^ %   ENT
  */
  const KEYS_NUMERIC = [
    { label: '7', onClick: () => setExpression(expression + '7') },
    { label: '8', onClick: () => setExpression(expression + '8') },
    { label: '9', onClick: () => setExpression(expression + '9') },
    { label: 'DEL', onClick: () => setExpression(expression.slice(0, -1)) },
    { label: 'AC', onClick: () => setExpression('') },
    { label: '4', onClick: () => setExpression(expression + '4') },
    { label: '5', onClick: () => setExpression(expression + '5') },
    { label: '6', onClick: () => setExpression(expression + '6') },
    { label: '*', onClick: () => setExpression(expression + '*') },
    { label: '/', onClick: () => setExpression(expression + '/') },
    { label: '1', onClick: () => setExpression(expression + '1') },
    { label: '2', onClick: () => setExpression(expression + '2') },
    { label: '3', onClick: () => setExpression(expression + '3') },
    { label: '+', onClick: () => setExpression(expression + '+') },
    { label: '-', onClick: () => setExpression(expression + '-') },
    { label: '0', onClick: () => setExpression(expression + '0') },
    { label: '.', onClick: () => setExpression(expression + '.') },
    { label: '^', onClick: () => setExpression(expression + '^') },
    { label: '%', onClick: () => setExpression(expression + '%') },
    { label: 'ENT', onClick: () => setExpression(expression + ' ') },
  ];
  return (
    <div className='keypad'>
      <div className='extend'>
        {KEYS_EXTENDED.map((key) => {
          return (
            <button
              key={key.label}
              className='key'
              onClick={key.onClick}
            >
              <div className='shift'>{'\u00a0'}</div>
              {key.label}
              <div className='alpha'>{'\u00a0'}</div>
            </button>
          );
        })}
      </div>

      <div className='basic'>
        {KEYS_NUMERIC.map((key) => {
          const className = key.label === ' '
            ? 'spacer'
            : key.label === 'ENT'
            ? 'primary'
            : key.label === 'DEL'
            ? 'warning'
            : key.label === 'AC'
            ? 'danger'
            : '';
          return (
            <button
              key={key.label}
              onClick={key.onClick}
              className={`key ${className}`}
            >
              <div className='shift'>{'\u00a0'}</div>
              {key.label}
              <div className='alpha'>{'\u00a0'}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const Spacer = () => <div className='spacer' />;

const App = () => {
  const [expression, setExpression] = useState('');
  const [queue, setQueue] = useState<rpn.Queue>([]);
  const [stack, setStack] = useState<rpn.Stack>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // console.debug('expression:', expression);
    // console.debug('queue:', queue);
    // console.debug('stack:', stack);
    setQueue(rpn.parse(expression));
    try {
      const s = rpn.interpret(rpn.parse(expression));
      setStack(s);
      setMessage(s.length > 0 ? JSON.stringify(s[0]?.value) : '');
    } catch (e) {
      console.error(e);
      setMessage(`ERR: ${e.message}`);
    }
  }, [expression]);

  return (
    <div className='app'>
      <Screen
        expression={expression}
        setExpression={setExpression}
        queue={queue}
        setQueue={setQueue}
        stack={stack}
        setStack={setStack}
        message={message}
        setMessage={setMessage}
      />
      {/* <Spacer /> */}
      <Keypad
        expression={expression}
        setExpression={setExpression}
        queue={queue}
        setQueue={setQueue}
        stack={stack}
        setStack={setStack}
      />
    </div>
  );
};

createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
