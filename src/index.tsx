// @ts-types="@types/react"
import React, { useState } from 'react';
// @ts-types="@types/react-dom/client"
import { createRoot } from 'react-dom/client';

import { evaluate } from './core.ts';
import './style.css';

const App = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<[string, string][]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpression(e.target.value);
    try {
      setResult(evaluate(e.target.value.trim()).toString());
    } catch (e) {
      setResult(`ERR: ${e.message}`);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (expression === '') {
      return;
    }

    setHistory((prev) => [...prev, [expression, result]]);
  };

  return (
    <main>
      <div className='input'>
        <form
          onSubmit={handleSubmit}
        >
          <label htmlFor='expression'></label>
          <input
            type='text'
            placeholder='式を入力'
            value={expression}
            onChange={handleChange}
          />
        </form>
        <p
          className={result.startsWith('ERR:') ? 'error' : ''}
        >
          {result}
        </p>
      </div>
      <ul className='history'>
        {[...history].map(([expression, result], idx) => (
          <li
            key={idx}
            onClick={() => {
              setExpression(expression);
              setResult(result);
            }}
          >
            <p
              className={result.startsWith('ERR:') ? 'error' : ''}
            >
              {expression}
            </p>
            <p
              className={result.startsWith('ERR:') ? 'error' : ''}
            >
              {result}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
