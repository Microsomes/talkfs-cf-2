// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSM7Avs67W18AIHfRflB_-ZFJ_TxqU-Lg",
  authDomain: "talkfs-2c2f6.firebaseapp.com",
  projectId: "talkfs-2c2f6",
  storageBucket: "talkfs-2c2f6.appspot.com",
  messagingSenderId: "533526022090",
  appId: "1:533526022090:web:36af1c83752036facbf133"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export {
  app,
  getAuth
}
