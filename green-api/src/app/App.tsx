import { BrowserRouter, Route, Routes } from 'react-router';
import Header from '../components/Header';
import './App.css';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';

function App() {
  return (
    <>
      <Header />
      <div className="pt-20">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
