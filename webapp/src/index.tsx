import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import './index.css';
import WebApp from './WebApp';
import globalReducer from './redux-store';

const store = configureStore({
  reducer: { global: globalReducer },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <WebApp />
    </Provider>
  </React.StrictMode>
);
