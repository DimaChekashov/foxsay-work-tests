import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import ResetPassword from '../pages/ResetPassword/ResetPassword';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
