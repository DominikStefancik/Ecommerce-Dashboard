import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<WebApp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
