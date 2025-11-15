import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { store } from '@/app/store';
import { Provider } from 'react-redux';
import './main.css';

const container = document.getElementById('app');

if (!container) {
  throw new Error('Не найден корневой элемент с id="app"');
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
