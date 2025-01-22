import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from '../context/Auth/AuthProvider';
import Header from '../components/Header/Header';
import { Box, Toolbar } from '@mui/material';

function App() {
  return (
    <BrowserRouter basename={window.location.pathname}>
      <AuthProvider>
        <Header />
        <Box component="main">
          <Toolbar />
          <Routes>
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/reset-password" 
              element={<ResetPassword />}
            />
          </Routes>
        </Box>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
