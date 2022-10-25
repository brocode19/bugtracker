// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "bugtracker-4416a.firebaseapp.com",
  projectId: "bugtracker-4416a",
  storageBucket: "bugtracker-4416a.appspot.com",
  messagingSenderId: "727941098044",
  appId: "1:727941098044:web:cd7871a6066fb84ddb7139"
};

const app = initializeApp(firebaseConfig);
export  {getAuth}