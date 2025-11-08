import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './main.css';

const container = document.getElementById('app');

if (!container) {
  throw new Error('Не найден корневой элемент с id="app"');
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
