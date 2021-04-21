import React, { useState } from 'react';

import MainGallery from './components/MainGallery/MainGallery';
import Profile from './components/Profile/Profile';

import './App.css';
import Header from './components/Header/Header';

function App() {
  const [isOpenedProfile, setIsOpenedProfile] = useState(false);
  const [currentUserId, setCurrentUserId] = useState();


  return (
    <div className="App">
        <Header/>
        {
          !isOpenedProfile ? 
            <MainGallery setCurrentUserId={setCurrentUserId} isOpenedProfile={isOpenedProfile} setIsOpenedProfile={setIsOpenedProfile} />
          :
            <Profile userId={currentUserId}/>
        }
    </div>
  );
}

export default App;
