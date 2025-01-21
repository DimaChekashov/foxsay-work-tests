import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App.tsx';
import { createTheme, ThemeProvider } from '@mui/material';
import { AuthProvider } from './context/Auth/AuthProvider.tsx';
import { UserProvider } from './context/User/UserProvider.tsx';

const theme = createTheme({});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <UserProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UserProvider>
    </ThemeProvider>
  </StrictMode>,
);
