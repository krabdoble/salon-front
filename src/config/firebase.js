// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getAuth, GoogleAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB2fDv5bnVQn4re7HWkKQvsmFwAh3ZOxA",
  authDomain: "salon-project-c036b.firebaseapp.com",
  projectId: "salon-project-c036b",
  storageBucket: "salon-project-c036b.firebasestorage.app",
  messagingSenderId: "628528249568",
  appId: "1:628528249568:web:d24c798deb1749b846ee85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider= new GoogleAuthProvider();