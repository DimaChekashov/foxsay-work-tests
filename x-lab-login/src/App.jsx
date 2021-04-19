import React, { useState } from 'react';
import Login from './components/auth/Login';

import './App.css';
import UserList from './components/UserList/UserList';
import { getLoggedUsername, setLoggedUsername, clearStore } from './store';
import Header from './components/Header/Header';

function App() {
  const [username, setUsername] = useState(getLoggedUsername());

  const onLoginSuccess = (username) => {
    setLoggedUsername(username);
    setUsername(username);
  }

  const onLogoutSuccess = () => {
    clearStore();
    setUsername(null);
  }

  return (
    <div className="container">
      {
        username ? 
          <>
            <Header username={username} 
                    onLogoutSuccess={onLogoutSuccess}/>
            <UserList/>
          </> 
          : <Login onSuccess={onLoginSuccess}/> 
      }
    </div>
  );
}

export default App;
