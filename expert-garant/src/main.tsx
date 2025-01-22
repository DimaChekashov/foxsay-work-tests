import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import { createTheme, ThemeProvider } from '@mui/material';
import { UserProvider } from './context/User/UserProvider.tsx';

const theme = createTheme({});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <App />
      </UserProvider>
    </ThemeProvider>
  </StrictMode>,
);
