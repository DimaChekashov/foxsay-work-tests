import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import ResetPassword from '../pages/ResetPassword/ResetPassword';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
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
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
