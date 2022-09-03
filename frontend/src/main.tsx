import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes/_Router';

import "./i18n";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);