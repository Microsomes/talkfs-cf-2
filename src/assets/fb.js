
import { initializeApp } from "firebase/app";
 
import { getAuth } from "firebase/auth";




const firebaseConfig = {
    apiKey: "AIzaSyCSdMgDkaOZX5p2x8XUQ8bM8PctvFeP5bg",
    authDomain: "social-e5fb1.firebaseapp.com",
    databaseURL: "https://social-e5fb1.firebaseio.com",
    projectId: "social-e5fb1",
    storageBucket: "social-e5fb1.appspot.com",
    messagingSenderId: "822884826653",
    appId: "1:822884826653:web:fc13527c669d06daca10f4",
    measurementId: "G-Q7NG4SF5CQ"
  };

  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);


  //export auth
export { auth };