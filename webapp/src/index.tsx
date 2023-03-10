import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import WebApp from './WebApp';
import { store } from '@local/redux-store/index';

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
