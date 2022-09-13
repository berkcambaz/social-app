import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes/_Router';

import "./i18n";
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router />
    </ThemeProvider>
  </React.StrictMode>
);