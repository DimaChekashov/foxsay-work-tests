import { BrowserRouter, Route, Routes } from 'react-router';
import Header from '../components/Header';
import './App.css';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';
import ProtectedRoute from '../components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="pt-20">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<ChatPage />} />
            </Route>

            <Route path="login" element={<LoginPage />} />
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
