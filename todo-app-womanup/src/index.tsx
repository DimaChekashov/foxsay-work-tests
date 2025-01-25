import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import firebase from "firebase";
import 'firebase/firestore';
import "firebase/storage";
import './index.less';

firebase.initializeApp({
  apiKey: "AIzaSyBf6Q3C9oAq0x27hzfp0erkSffSmeXsNVs",
  authDomain: "todo-womenup.firebaseapp.com",
  projectId: "todo-womenup",
  storageBucket: "todo-womenup.appspot.com",
  messagingSenderId: "681660044676",
  appId: "1:681660044676:web:98a7e7b32b2510b330f9d1"
});

export const Context = createContext<any>(null);

const firestore = firebase.firestore();
const storage = firebase.storage();
const storageRef = firebase.storage().ref()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{
    firebase,
    storage,
    storageRef,
    firestore
  }}>
    <App />
  </Context.Provider>
);
