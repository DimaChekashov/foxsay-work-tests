import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import { AuthProvider } from '../context/Auth/AuthProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
