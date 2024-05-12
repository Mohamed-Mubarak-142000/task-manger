// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_APP_FIREBASE_API_KEY ||
    "AIzaSyDef_m4YpyX9du11653uzP0MuwXpYnmHFI",
  authDomain: "taskmanger-c7fa1.firebaseapp.com",
  projectId: "taskmanger-c7fa1",
  storageBucket: "taskmanger-c7fa1.appspot.com",
  messagingSenderId: "215939548986",
  appId: "1:215939548986:web:3a321f299072836632f203",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
